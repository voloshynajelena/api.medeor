import { ITestsGroup } from '../../Interfaces/TestsInterface';
import Mongo from '../mongoConnect';

const { client } = Mongo;
const dbName = 'medeordb';
const collection = 'testsGroupsTemplate';

const getAllGroupTemplates = async (): Promise<ITestsGroup[]> => {
    const { data } = await client.db(dbName).collection(collection)
        .findOne()
    return data
}

const addTestGroupTemplate = async (template: ITestsGroup): Promise<ITestsGroup[]> => {
    const data = await getAllGroupTemplates();
    const newTests = [...data, template]
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: newTests } });

    return newTests
}

const updateTestTemplate = async (template: ITestsGroup): Promise<ITestsGroup[]> => {
    const data: ITestsGroup[] = await getAllGroupTemplates();
    const newTests: ITestsGroup[] = data.map((test: ITestsGroup) => test.typeId === template.typeId ? { ...test, ...template } : test);
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: newTests } });

    return newTests
}

const deleteTestTemplate = async (typeId: string): Promise<ITestsGroup[]> => {
    const data: ITestsGroup[] = await getAllGroupTemplates();
    const newTests = data.filter((test: ITestsGroup) => test.typeId !== typeId);
    await client.db(dbName).collection(collection)
        .updateOne({}, { $set: { data: newTests } });

    return newTests
}

export {
    getAllGroupTemplates,
    addTestGroupTemplate,
    updateTestTemplate,
    deleteTestTemplate
}