import { DataTypes } from 'sequelize';

const contactColumns = Object.freeze({
    tipo_proyecto: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    presupuesto: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    plazo: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    preferencia_contacto: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(30),
        allowNull: true
    }
});

export const addContactFields = async (queryInterface) => {
    const currentColumns = await queryInterface.describeTable('mensajes');
    const addedColumns = [];

    for (const [columnName, definition] of Object.entries(contactColumns)) {
        if (currentColumns[columnName]) continue;

        await queryInterface.addColumn('mensajes', columnName, definition);
        addedColumns.push(columnName);
    }

    return addedColumns;
};
