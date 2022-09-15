
export type Language = "Python" | "Javascript" | "C/C++" | "Other"
export interface CardInfo {
    title: string,
    info: string,
    more_info: string,
    img?: string,
    repo?: string,
    live?: string,
    download?: string,
    video?: string,
    date: Date,
    completed: boolean,
    coolness: number,
    language: Language,
}

export const allProjects: CardInfo[] = [
  {
    title: "Robotic Arm",
    info: "Homemade 3DOF robot arm",
    more_info: "Runs on a raspberry pi using the Orocos library for inverse kinematics and trajectory planning, uses apriltags and a intel realsense camera to localize",
    repo: "https://github.com/OliverW10/arm",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    completed: false,
    date: new Date(2022, 8),
    coolness: 4, // 0-10
    language: "C/C++",
  },
  {
    title: "Word search solver",
    info: "An android app to solve word search's (find-a-word's) by taking a picutre",
    more_info: "Uses Kivy to build to android, uses opencv to do image processing",
    repo: "https://github.com/OliverW10/word-search-solver",
    live: "https://OliverW10.github.io/word-search-solver",
    download: "https://github.com/OliverW10/word-search-solver/releases/download/v0.3-alpha/myapp-0.3-armeabi-v7a-debug.apk",
    date: new Date(2020, 11),
    completed: true,
    coolness: 8, // 0-10
    language: "Python"
  },
  {
    title: "Bad Wordle Solver",
    info: "Program to a solve wordle by only seeing the colors of the squares",
    more_info: "Tries to guess the wordle by only seeing the emoji board you get when you finish a game",
    repo: "https://github.com/OliverW10/wordle",
    completed: true,
    date: new Date(2021, 11),
    coolness: 3, // 0-10
    language: "C/C++",
  },
  {
    title: "Pacman",
    info: "AI experiments in pacman",
    more_info: "Pacman made using pygame with various AI's to control the ghosts and pacman",
    repo: "https://github.com/OliverW10/pacman",
    live: "https://OliverW10.github.io/pacman",
    completed: false,
    date: new Date(2022, 6),
    coolness: 5, // 0-10
    language: "Python",
  },
  {
    title: "Pizza",
    info: "Pizza ordering webapp and database",
    more_info: "Used React for the front-end, NodeJs and PostgreSQL for the backend",
    repo: "https://github.com/OliverW10/sdd-pizza",
    live: "https://sdd-pizza.netlify.app/",
    completed: true,
    date: new Date(2021, 9),
    coolness: 7, // 0-10
    language: "Javascript",
  },
  {
    title: "Chaos",
    info: "Chaotic gravity simulation visualization",
    more_info: "webgl GLSL shader to visualize the chaotic nature of a triple attractor",
    repo: "https://github.com/OliverW10/chaos",
    live: "https://OliverW10.github.io/chaos/webgl",
    completed: true,
    date: new Date(2022, 1),
    coolness: 3, // 0-10
    language: "Other",
  },
  {
    title: "Playlister",
    info: "Sorts spotify playlists by the colour of their album cover",
    more_info: "Used react and the spotify api",
    repo: "https://github.com/OliverW10/playlister",
    live: "https://oliverw10.github.io/playlister",
    completed: false,
    date: new Date(2021, 7),
    coolness: 3, // 0-10
    language: "Javascript",
  },
  {
    title: "Tonnis",
    info: "Tennis game made in javascript with html canvas",
    more_info: "",
    repo: "https://github.com/OliverW10/js-games/blob/games/tennis",
    live: "https://oliverw10.github.io/js-games/tennis/index.html",
    completed: true,
    date: new Date(2020, 4),
    coolness: 5, // 0-10
    language: "Javascript",
  },
  {
    title: "Drifting game",
    info: "Top down racing game made in javascript with html canvas",
    more_info: "",
    repo: "https://github.com/OliverW10/js-games/blob/games/racer/",
    live: "https://oliverw10.github.io/js-games/race.html",
    completed: true,
    date: new Date(2019, 6),
    coolness: 4, // 0-10
    language: "Javascript",
  },
  {
    title: "Multiplayer",
    info: "Realtime multiplayer pvp web game using WebRTC",
    more_info: "Uses react for the UI and WebRTC for peer-to-peer aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa ",
    repo: "https://github.com/OliverW10/multiplayer",
    live: "https://OliverW10.github.io/multiplayer",
    completed: false,
    date: new Date(2021, 11),
    coolness: 4, // 0-10
    language: "Javascript",
  },
  {
    title: "FRC 2022",
    info: "Captain for the 2022 First robotics competition season on team 4774",
    more_info: "Lead a team to build a robot and automate almost all robot actions using RobotPy",
    repo: "https://github.com/thedropbears/pyrapidreact",
    video: "https://www.youtube.com/watch?v=IaR-7Fr0wzE",
    completed: true,
    date: new Date(2022, 2),
    coolness: 6, // 0-10
    language: "Python",
  },
]