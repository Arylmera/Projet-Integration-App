import 'react-native';
import data from '../components/View/profile/data/AvatarData';

test('quizz data test', () => {
   expect(data).toMatchSnapshot();
   expect(data).toHaveLength(32);
});

for (let i in data) {
   test(
      'data' +
         i +
         ' should have properties (id, response 1 to 4, reponseCorrecte, image)',
      () => {
         expect(data[i]).toHaveProperty('id');
         expect(data[i]).toHaveProperty('img');
      },
   );
}

test('item returns 3 firsts', () => {
   const item1 = data[0];
   const item2 = data[1];
   const item3 = data[2];
   const item = jest.fn((item) => item.id);
   item(item1);
   item(item2);
   item(item3);
   expect(item).toHaveLastReturnedWith('3');
   expect(item).toHaveBeenCalledTimes(3);
});

test('item data has id 1 and matches as an object', () => {
   const id1 = {
      id: '1',
      img: require('../assets/avatars/avatar1.png'),
   };
   expect(data[0]).toMatchObject(id1);
});
