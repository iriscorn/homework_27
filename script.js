const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];


function distribution(arr) {
	let upsUsers = arr.map((obj) => {
		switch (obj.role) {
		   	case "lector":
			   return new Lector(obj);
		   	case "admin":
				return new Admin(obj);
			default:
				return new Student(obj);
		}
	});
	return upsUsers;
}

function renderUsers(arr) {
	return arr.map(obj => obj.render());
}

function getMark(item) {
	for(key in gradation) {
		if(item <= key) return gradation[key];
	}
}

function addClass(item) {
	if(item instanceof Lector || item instanceof Admin) {
		return `user__courses admin--info`;
	} else {
		return `user__courses`;
	}
}

class User {
	constructor(obj) {
		this.name = obj.name ? obj.name : "";
		this.age = obj.age ? obj.age : "";
		this.img = obj.img ? obj.img : "";
		this.role = obj.role ? obj.role : "";
		this.courses = obj.courses ? obj.courses : [];
	}

	render() {
		return `
			<div class="users">
				<div class="user">
					<div class="user__info">
						<div class="user__info--data">
							<img src="images/users/${this.img}.png" alt="${this.name}" height="50">
							<div class="user__naming">
								<p>
								Name: <b>${this.name}</b>
								</p>
								<p>
								Age: <b>${this.age}</b>
								</p>
							</div>
						</div>
						<div class="user__info--role ${this.role}">
							<img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
							<p>${this.role}</p>
						</div>
					</div>
					<div class="${addClass(this)}">
						${this.renderCourses()}
					</div>
				</div>
			</div>
		`;
	}

	renderCourses() {
		const arr = this.courses;
		return arr.length > 0 ? arr.map(obj =>`
			<p class="user__courses--course ${this.role}">${obj.title}
				<span class="${getMark(obj.mark)}">${getMark(obj.mark)}</span>
			</p>
		`
		).join("") : "";
	}	
}

class Student extends User {
	constructor(obj) {
		super(obj);
	}
}

class Lector extends User {
	constructor(obj) {
		super(obj);
	}

	renderCourses() {
		const arr = this.courses;
		return arr.length > 0 ? arr.map(obj =>`
			<div class="user__courses--course ${this.role}">
				<p>Title:
					<b>${obj.title}</b>
				</p>
				<p>Lector's score:
					<span class="${getMark(obj.score)}">${getMark(obj.score)}</span>
				</p>
				<p>Average student's score:
					<span class="${getMark(obj.studentsScore)}">${getMark(obj.studentsScore)}</span>
				</p>
			</div>
		`
		).join("") : "";
	}
}

class Admin extends User {
	constructor(obj) {
		super(obj);
	}

	renderCourses() {
		const arr = this.courses;
		return arr.length > 0 ? arr.map(obj =>`
			<div class="user__courses--course ${this.role}">
				<p>Title: 
					<b>${obj.title}</b>
				</p>
				<p>Admin's score:
					<span class="${getMark(obj.score)}">${getMark(obj.score)}</span>
				</p>
				<p>Lector:
					<b>${obj.lector}</b>
				</p>
			</div>
		`
		).join("") : "";
	}
}

const upgradeUsers = distribution(users);
const addUsers = renderUsers(upgradeUsers);
document.write(addUsers);
