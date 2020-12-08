import 'react-native';
import React from 'react';
import data from '../components/View/tips/data/QuizData';

test('quizz data test', () => {
    expect(data).toMatchSnapshot();
    expect(data).toHaveLength(10);
    expect(data.map(item => item.id)).toEqual([
        '1','2','3','4','5','6','7','8','9','10'
    ]);
});

for (let i in data) {
    test('data' + i +' should have properties (id, response 1 to 4, reponseCorrecte, image)', () => {
        expect(data[i]).toHaveProperty('id');
        expect(data[i]).toHaveProperty('reponse1');
        expect(data[i]).toHaveProperty('reponse2');
        expect(data[i]).toHaveProperty('reponse3');
        expect(data[i]).toHaveProperty('reponse4');
        expect(data[i]).toHaveProperty('reponseCorrecte');
        expect(data[i]).toHaveProperty('image');
    })
};

test('mock implementation of a basic function', () => {
    const mock = jest.fn(() => 'I am a mock function');
    expect(mock('Calling my mock function')).toBe('I am a mock function');
    expect(mock).toHaveBeenCalledWith('Calling my mock function');
});

test('mock return value of a function one time', () => {
    const mock = jest.fn();
    mock.mockReturnValueOnce('Helloe').mockReturnValueOnce('there!');

    mock();
    mock();

    expect(mock).toHaveBeenCalledTimes(2);

    mock('Hello', 'there', 'Steve');
    expect(mock).toHaveBeenLastCalledWith('Hello', 'there', 'Steve');

    mock('Steve');
    expect(mock).toHaveBeenLastCalledWith('Steve');
});

test('mock implementation of a function', () => {
    const mock = jest.fn().mockImplementation(() => 'United Kingdom');
    expect(mock('Location')).toBe('United Kingdom');
    expect(mock).toHaveBeenCalledWith('Location');
});

test('spying using original implementation', () => {
    const item = {
        id: n => n
    }
    const spy = jest.spyOn(item, 'id');
    expect(item.id('1')).toBe('1');
    expect(spy).toHaveBeenCalledWith('1');
});

test('spying using mockImplementation', () => {
    const item = {
        id: n => n
    }
    const spy = jest.spyOn(item, 'id');
    spy.mockImplementation(n => 'Crazy id');
    expect(item.id('1')).toBe('Crazy id');
    spy.mockRestore();
    expect(item.id('1')).toBe('1');
});

test('item returns 5 last', () => {
    const item1 = data [0];
    const item2 = data [1];
    const item3 = data [2];
    const item = jest.fn(currentItem => currentItem.id);

    item(item1);
    item(item2);
    item(item3);

    expect(item).toHaveLastReturnedWith('3');
});
/*
test('item data has id 1 and matches as an object', () => {
    const id1 = {
        id: '1',
        reponse1: 'mésange',
        reponse2: 'hibou',
        reponse3: 'pic vert',
        reponse4: 'bruant jaune',
        reponseCorrecte: 'mésange',
        image: require('../../../../assets/quizz/mesange.jpg'),
    };
    expect(data[0]).toMatchObject(id1);
});
*/

test('expect a promise to resolve', async () => {
    const user = {
        getFullName: jest.fn(() => Promise.resolve('Amaury')),
    };
    await expect(user.getFullName('Amaury')).resolves.toBe('Amaury');
});

test('expect a promise to reject', async () => {
    const user = {
        getFullName: jest.fn(() => Promise.reject(new Error ('Something went wrong'))),
    };
    await expect(user.getFullName('Amaury')).rejects.toThrow('Something went wrong');
});
