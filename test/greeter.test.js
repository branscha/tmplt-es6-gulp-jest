import Greeter from 'greeter';

test('The greeter should talk.', () => {
  let greeter = new Greeter();
  expect(greeter.talk()).toBe("Hello");
});
