
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
    title: "Arm",
    info: "Homemade 3DOF robot arm",
    more_info: "Runs on a raspberry pi using the Orocos library for inverse kinematics and trajectory planning, uses apriltags and a intel realsense camera to localize",
    repo: "https://github.com/OliverW10/arm",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    completed: false,
    date: new Date(2022, 7),
    coolness: 4, // 0-10
    language: "C/C++",
  },
  {
    title: "Word search solver",
    info: "An android app to solve word search's (find-a-word's) by taking a picutre",
    more_info: "aaaa",
    repo: "https://github.com/OliverW10/word-search-solver",
    live: "https://OliverW10.github.io/word-search-solver",
    download: "https://github.com/OliverW10/word-search-solver/releases/download/v0.3-alpha/myapp-0.3-armeabi-v7a-debug.apk",
    date: new Date(2020, 11),
    completed: true,
    coolness: 8, // 0-10
    language: "Python"
  },
  {
    title: "Wordle Solver",
    info: "Program to a solve wordle from just the emoji output you get",
    more_info: "aaaa",
    repo: "https://github.com/OliverW10/wordle",
    completed: true,
    date: new Date(2021, 11),
    coolness: 3, // 0-10
    language: "C/C++",
  },
  {
    title: "Pacman",
    info: "AI experiments in pacman",
    more_info: "aaaa",
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
    more_info: "Used React for the front-end, PostgreSQL for the backend",
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
    more_info: "webgl GLSL shader to visualize the chaotic nature of a tripple attractor",
    repo: "https://github.com/OliverW10/chaos",
    live: "https://OliverW10.github.io/chaos",
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
    repo: "https://github.com/OliverW10/OliverW10.github.io/blob/games/tennis",
    live: "https://oliverw10.github.io/tennis/index.html",
    completed: true,
    date: new Date(2020, 4),
    coolness: 5, // 0-10
    language: "Javascript",
  },
  {
    title: "Drifting game",
    info: "Top down racing game made in javascript with html canvas",
    more_info: "",
    repo: "https://github.com/OliverW10/OliverW10.github.io/blob/games/racer/",
    live: "https://oliverw10.github.io/racer/race.html",
    completed: true,
    date: new Date(2019, 6),
    coolness: 4, // 0-10
    language: "Javascript",
  },
  {
    title: "Multiplayer",
    info: "Multiplayer web game using WebRTC, uses react for the UI",
    more_info: "",
    repo: "https://github.com/OliverW10/multiplayer",
    live: "https://OliverW10.github.io/multiplayer",
    completed: false,
    date: new Date(2021, 11),
    coolness: 4, // 0-10
    language: "Javascript",
  },
  {
    title: "FRC 2022",
    info: "Robot code for the 2022 First robotics competition season on team 4774",
    more_info: "Implimented kalman filter localization, path generation, automated turret and swerve drive code",
    repo: "https://github.com/thedropbears/pyrapidreact",
    video: "https://www.youtube.com/watch?v=IaR-7Fr0wzE",
    completed: true,
    date: new Date(2022, 2),
    coolness: 6, // 0-10
    language: "Python",
  },
]