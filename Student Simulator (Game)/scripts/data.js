var m_Student = {
    life: 100,
    money: 100,
    currentPlace: "Dorm" // index
}

var m_Rooms = {
    Dorm: {
        title: "Dorm",
        description: "This is where you live. Enjoy this lovely room!\nIt is actually pretty comfortable to live in, good for you!",
        image: "../images/dorm.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "Window", cost: -10000000000},
            { title: "Hall", cost: -3}
        ]
    },

    Window: {
        title: "",
        description: "",
        image: "",
        // Title (button name & where to go if clicked)
        actions: [],
    },

    Hall: {
        title: "Hall",
        description: "That is a lovely hall of your beautiful dorm. Take a look around!\nAnd don't drop anything here, save the beauty!",
        image: "../images/hall.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "Dorm", cost: -5},
            { title: "University", cost: -10},
            { title: "Bathroom", cost: 3},
            { title: "Kitchen", cost: -3}
        ]
    },

    University: {
        title: "University",
        description: "The university. Get in to study, don't waste any time (no more description, go learning things!!!)",
        image: "../images/university.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "Dorm", cost: -10}, 
            { title: "Canteen", cost: 30},
            { title: "HistoryClass", cost: -10}, 
            { title: "MathClass", cost: -40} 
        ]
    },

    HistoryClass: {
        title: "HistoryClass",
        description: "It doesn't matter what your major is, you still need to attend history classes. Live with that!",
        image: "../images/historyClass.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "MathClass", cost: -20},
            { title: "University", cost: -10},
            { title: "Window", cost: -10000000000}
        ]
    },

    MathClass: {
        title: "MathClass",
        description: "This is your most favorite place, isn't it? Isn't it... :(",
        image: "../images/mathClass.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "University", cost: -10},
            { title: "Window", cost: -10000000000},
            { title: "HistoryClass", cost: -10},
            { title: "Army", cost: 100000}
        ]
    },

    Canteen: {
        title: "Canteen",
        description: "It's time to eat and refresh yourself. Here you can find a lot of different kinds of food, including rats, cockroaches, insects in any kind, and some fresh water to drink)",
        image: "../images/canteen.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "University", cost: -10},
            { title: "Window", cost: -10000000000},
            { title: "HistoryClass", cost: -10},
            { title: "MathClass", cost: -10}
        ]
    },
    
    Army: {
        title: "Army",
        description: "Well, congratulations! You better finish university before joining army, but anyway (failure).",
        image: "../images/army.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "University", cost: -98000},
            { title: "Window", cost: -10000000000}
        ]
    },

    Bathroom: {
        title: "Bathroom",
        description: "Wash you hands, maybe something else and go to the university. You need to study!",
        image: "../images/bathroom.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "Hall", cost: -10},
            { title: "Window", cost: -10000000000}
        ]
    },

    Kitchen: {
        title: "Kitchen",
        description: "Unfortunately, you don't have any food here. Go to the canteen!",
        image: "../images/kitchen.jpg",
        // Title (button name & where to go if clicked)
        actions: [
            { title: "Hall", cost: -10},
            { title: "Window", cost: -10000000000}
        ]
    }

}
