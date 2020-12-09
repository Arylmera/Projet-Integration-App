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

test('item returns 3 last', () => {
    const item1 = data [0];
    const item2 = data [1];
    const item = jest.fn(item => item.id);
    item(item1);
    item(item2);
    expect(item).toHaveLastReturnedWith('2');
    expect(item).toHaveBeenCalledTimes(2)
});

test('item data has id 1 and matches as an object', () => {
    const id1 = {
        id: '1',
        reponse1: 'mésange',
        reponse2: 'hibou',
        reponse3: 'pic vert',
        reponse4: 'bruant jaune',
        reponseCorrecte: 'mésange',
        image: require('../assets/quizz/mesange.jpg'),
    };
    expect(data[0]).toMatchObject(id1);
});
