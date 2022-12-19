const RPS = {
  name: "rockpaperscissors",
  description: "Play Rock Paper Scissors with me ",
  options: [
    {
      name: "choice",
      description: "choose your item",
      type: 4, // int
      required: true,
      choices: [
        {
          name: "Rock 🪨",
          value: 0
        },
        {
          name: "Paper 📃",
          value: 1
        },
        {
          name: "Scissors ✂️",
          value: 2
        }
      ],
    }
  ]
}

export default RPS;