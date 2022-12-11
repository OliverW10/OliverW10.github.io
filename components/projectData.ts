
export type Language = "Python" | "Javascript" | "C/C++" | "Other"
export const allLanguages: Language[] = ["Python", "Javascript", "C/C++", "Other"]
export interface ImgObj {
  src: string,
  width: number,
  height: number,
}
export interface CardInfo {
    title: string,
    info: string,
    more_info: string,
    repo?: string,
    live?: string,
    download?: string,
    video?: string,
    date: Date,
    completed: boolean,
    coolness: number,
    language: Language,
    imgs?: ImgObj[],
}

export const allProjects: CardInfo[] = [
  {
    title: "Robotic Arm",
    info: "Handheld Robot arm that keeps its end still while it's moved.",
    more_info: "Tracks its pose with an Intel realsense camera and apriltags and uses inverse kinematics to find the angles the joints should be at",
    repo: "https://github.com/OliverW10/arm",
    video: "https://youtu.be/RnPSjz9bV3A",
    completed: false,
    date: new Date(2022, 11),
    coolness: 5, // 0-10
    language: "C/C++",
  },
  {
    title: "Word search solver",
    info: "An android app to solve word search's (find-a-word's) by taking a picutre",
    more_info: "Uses Kivy to build to android, uses OpenCV to do image processing. Used the K-Nearest-Neighbor algorithm to classify the letters with over 95% accuracy.",
    repo: "https://github.com/OliverW10/word-search-solver",
    live: "https://oliverw10.github.io/js-games/word-search-solver.html",
    download: "https://github.com/OliverW10/word-search-solver/releases/download/v0.3-alpha/myapp-0.3-armeabi-v7a-debug.apk",
    date: new Date(2020, 11),
    completed: true,
    coolness: 8, // 0-10
    language: "Python",
    imgs: [{
        src: "/images/wss.jpg",
        width:6*30,// image is 6:13
        height:13*30,
      }]
  },
  {
    title: "Limited Wordle Solver",
    info: "Program to try and solve a wordle by only seeing the colors of the squares",
    more_info: "Tries to guess the wordle by only seeing the emoji board you get when you finish a game that only shows the colour of each square. It turns out that you need a large number of these boards to get a distinct answer but it could narrow it down to a dozen or so words with just a few.",
    repo: "https://github.com/OliverW10/wordle",
    completed: true,
    date: new Date(2022, 2),
    coolness: 3, // 0-10
    language: "C/C++",
  },
  {
    title: "Pacman",
    info: "AI experiments in pacman",
    more_info: "Pacman made using pygame with various AI's to control both the ghosts and pacman. Some of the implemented AI's were: game tree search, imitation and adversarial(incomplete) machine learning, heuristic algorithms, recreation of original game's ghost AI.",
    repo: "https://github.com/OliverW10/pacman",
    live: "https://OliverW10.github.io/pacman",
    completed: false,
    date: new Date(2022, 5),
    coolness: 5, // 0-10
    language: "Python",
  },
  {
    title: "Pizza",
    info: "Pizza ordering webapp and SQL database",
    more_info: "Used React for the front-end, NodeJs and PostgreSQL for the backend. Was hosted on heroku but they no longer do free hosting so its currently down, you can still run it from the github",
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
    date: new Date(2022, 0),
    coolness: 3, // 0-10
    language: "Other",
    imgs: [{
        src: "/images/chaos1.gif",
        width:600,
        height:600,
      }, {
        src: "/images/chaos2.gif",
        width:600,
        height:600,
      }]
  },
  {
    title: "Playlister",
    info: "Sorts spotify playlists by the colour of their album cover and can combine playlists.",
    more_info: "Used react and the spotify api. Not in particularly finished state. Was hosted on heroku but they no longer do free hosting so its currently down",
    repo: "https://github.com/OliverW10/playlister",
    live: "https://oliverw10.github.io/playlister",
    completed: false,
    date: new Date(2021, 6),
    coolness: 3, // 0-10
    language: "Javascript",
  },
  {
    title: "Tonnis",
    info: "Tennis game made in javascript with html canvas",
    more_info: "Has a custom 3d renderer",
    repo: "https://github.com/OliverW10/js-games/tree/master/tennis",
    live: "https://oliverw10.github.io/js-games/tennis/index.html",
    completed: true,
    date: new Date(2020, 6),
    coolness: 5, // 0-10
    language: "Javascript",
  },
  {
    title: "Drifting game",
    info: "Top down racing game made in javascript with html canvas",
    more_info: "",
    repo: "https://github.com/OliverW10/js-games/tree/master/racer/",
    live: "https://oliverw10.github.io/js-games/racer/race.html",
    completed: true,
    date: new Date(2019, 6),
    coolness: 4, // 0-10
    language: "Javascript",
  },
  {
    title: "Multiplayer",
    info: "Realtime multiplayer pvp web game using WebRTC",
    more_info: "Uses react for the UI and WebRTC for peer-to-peer networking. Was hosted on heroku but they no longer do free hosting so its currently down",
    repo: "https://github.com/OliverW10/multiplayer",
    live: "https://OliverW10.github.io/multiplayer",
    completed: false,
    date: new Date(2021, 8),
    coolness: 4, // 0-10
    language: "Javascript",
  },
  {
    title: "First robotics competition",
    info: "Captain on team 4774 'The Drop Bears' for the 2022-3 seasons.",
    more_info: "Came 2nd at the australian regional and won the hawaii regional.",
    repo: "https://github.com/thedropbears/pyrapidreact",
    video: "https://www.youtube.com/watch?v=IaR-7Fr0wzE",
    completed: true,
    date: new Date(2022, 2),
    coolness: 5, // 0-10
    language: "Python",
  },
]