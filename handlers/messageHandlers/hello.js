function hello() {
  const greetings = ["Hi Super! 😎", "Hi Super User! 🤙", "Greetings 🤓"];
  return greetings[Math.floor(Math.random() * greetings.length)];
}
export default hello;
