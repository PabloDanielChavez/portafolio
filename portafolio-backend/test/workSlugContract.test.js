import assert from 'node:assert/strict';
import test from 'node:test';

import {
    WORK_SLUG_MAX_LENGTH,
    WORK_SLUG_PATTERN,
    WORK_SLUG_UNIQUE_INDEX
} from '../constants/workSlugs.js';
import { createGetAllController } from '../controllers/apiController.js';
import { WORK_SLUG_BACKFILL } from '../migrations/20260701-add-work-slugs.js';
import { trabajos } from '../models/Portafolio.js';

test('el modelo de trabajos define slug obligatorio, único y validado', async () => {
    const slugAttribute = trabajos.rawAttributes.slug;

    assert.equal(slugAttribute.type.toString(), 'VARCHAR(160)');
    assert.equal(slugAttribute.allowNull, false);
    assert.equal(slugAttribute.unique, WORK_SLUG_UNIQUE_INDEX);
    assert.deepEqual(slugAttribute.validate.len, [
        1,
        WORK_SLUG_MAX_LENGTH
    ]);
    assert.equal(
        slugAttribute.validate.is.toString(),
        WORK_SLUG_PATTERN.toString()
    );

    await trabajos
        .build({ slug: 'esperanza-de-vida' })
        .validate({ fields: ['slug'] });

    await assert.rejects(
        () =>
            trabajos
                .build({ slug: 'Slug inválido' })
                .validate({ fields: ['slug'] }),
        /Validation is on slug failed/
    );
});

test('GET de trabajos conserva los cinco slugs canónicos', async () => {
    const rows = WORK_SLUG_BACKFILL.map((work) => ({ ...work }));
    const controller = createGetAllController({
        findAll: async () => rows
    });
    const response = {
        body: undefined,
        json(body) {
            response.body = body;
            return response;
        }
    };

    await controller({}, response);

    assert.deepEqual(response.body, rows);

    const slugs = response.body.map((work) => work.slug);

    assert.equal(slugs.length, 5);
    assert.equal(new Set(slugs).size, slugs.length);

    for (const slug of slugs) {
        assert.equal(WORK_SLUG_PATTERN.test(slug), true, slug);
    }
});
