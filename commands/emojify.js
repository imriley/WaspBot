const Emojify = {
  name: "emojify",
  description: "Emojifies your message",
  options: [
    {
      name: "message",
      description: "your message to emojify",
      type: 3, // string
      required: true
    }
  ]
}

export default Emojify;