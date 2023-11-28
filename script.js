let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let info = document.querySelector("#calendar .info");
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

draw(body, year, month);

function draw(body, year, month) {
	let arr = range(getLastDay(year, month));
	
	let firstWeekDay = getFirstWeekDay(year, month);
	let lastWeekDay  = getLastWeekDay(year, month);
	
	let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
	createTable(body, nums)
}

function createTable(parent, arr) {
	parent.textContent = '';
	let cells = [];
	
	for (let sub of arr) {
		let tr = document.createElement('tr');
		
		for (let num of sub) {
			let td = document.createElement('td');
			td.textContent = num;
			tr.appendChild(td);
			
			cells.push(td);
		}
		
		parent.appendChild(tr);
	}
	
	return cells;
}

function normalize(arr, left, right) {
	for (let i = 0; i < left; i++) {
		arr.unshift('');
	}
	for (var i = 0; i < right; i++) {
		arr.push('');
	}
	
	return arr;
}

function getFirstWeekDay(year, month) {
	let date = new Date(year, month, 1);
	let num  = date.getDay();
	
	if (num == 0) {
		return 6;
	} else {
		return num - 1;
	}
}

function getLastWeekDay(year, month) {
	let date = new Date(year, month + 1, 0);
	let num  = date.getDay();
	
	if (num == 0) {
		return 6;
	} else {
		return num - 1;
	}
}

function getLastDay(year, month) {
	let date = new Date(year, month + 1, 0);
	return date.getDate();
}

function range(count) {
	let arr = [];
	
	for (let i = 1; i <= count; i++) {
		arr.push(i);
	}
	
	return arr;
}

function chunk(arr, n) {
	let result = [];
	let count = Math.ceil(arr.length / n);
	
	for (let i = 0; i < count; i++) {
		let elems = arr.splice(0, n);
		result.push(elems);
	}
	
	return result;
}

function formatNumber(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

function getCurrentMonthAndYear() {
    let months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
    let date = new Date();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return `${month} ${year}`;
}

function getCurrentDay() {
    let date = new Date();
    return formatNumber(date.getDate());
}

info.textContent = ` ${getCurrentDay()} ${getCurrentMonthAndYear()}`;

function getNextYear(year, month) {
    if (month === 11) {
        return year + 1;
    } else {
        return year;
    }
}

function getNextMonth(month) {
    if (month === 11) {
        return 0;
    } else {
        return month + 1;
    }
}

function getPrevYear(year, month) {
    if (month === 0) {
        return year - 1;
    } else {
        return year;
    }
}

function getPrevMonth(month) {
    if (month === 0) {
        return 11;
    } else {
        return month - 1;
    }
}

next.addEventListener('click', function() {
    draw(body, getNextYear(year, month), getNextMonth(month));
    updateInfo(getNextYear(year, month), getNextMonth(month));
});

prev.addEventListener('click', function() {
    draw(body, getPrevYear(year, month), getPrevMonth(month));
    updateInfo(getPrevYear(year, month), getPrevMonth(month));
});

function getNextYear(currentYear, currentMonth) {
    if (currentMonth === 11) {
        return currentYear + 1;
    } else {
        return currentYear;
    }
}

function getNextMonth(currentMonth) {
    if (currentMonth === 11) {
        return 0;
    } else {
        return currentMonth + 1;
    }
}

function getPrevYear(currentYear, currentMonth) {
    if (currentMonth === 0) {
        return currentYear - 1;
    } else {
        return currentYear;
    }
}

function getPrevMonth(currentMonth) {
    if (currentMonth === 0) {
        return 11;
    } else {
        return currentMonth - 1;
    }
}

function updateInfo(year, month) {
    let months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
    info.textContent = `${months[month]} ${year}`;
}
