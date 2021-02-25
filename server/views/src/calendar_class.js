import { TodoList } from "./todolist.js";

class Calendar {
  constructor() {
    // DOM
    this.saveDate;
    this.nextMonth = document.getElementById("right");
    this.lastMonth = document.getElementById("left");
    this.nav = document.querySelector(".navigator");
    this.viewDays = document.querySelectorAll(".viewDays");
    this.calendar_name = document.querySelector(".calendar_name");
    this.blockline6 = document.querySelector(".blockline6");
    this.id_today = document.getElementById("today");
    this.dayBlock = document.querySelector(".day_block");
    this.year_month = document.querySelector(".year_month");


    // date
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.dayOfTheWeek = this.today.getDay();
    this.date = this.today.getDate();
    this.firstDay = this.getFirstDaysInMonth(this.month, this.year);
    this.DaysInMonth = this.getDaysInMonth(this.month, this.year);
    this.DaysInLastMonth = this.getDaysInMonth(this.month - 1, this.year);

    //todolist
    this.todolist = new TodoList();

    // event
    this.dayBlock.addEventListener("click", (event) => {
      if (event.target.classList.contains("noClick"))
        return;
      if (event.target.classList.contains("box")) {
        const newdate = event.target.textContent;
        const RealsaveDate = `${this.saveDate}${newdate < 10 ? `0${newdate}` : newdate}`;
        const pageDate = Number(RealsaveDate);
        this.todolist.showTodolist(pageDate);
        this.todolist.eventTarget = event.target;
        //이것 변수로 바꿔야됨 year+month+date
      }
    });
    this.lastMonth.addEventListener("click", () => {
      this.viewDays[this.firstDay + this.date - 1].classList.remove("today");
      this.setmonth(-1);
    });
    this.id_today.addEventListener("click", () => {
      this.writeDate(this.firstDay, this.DaysInMonth, this.DaysInLastMonth, this.month, this.year);
      this.viewDays[this.firstDay + this.date - 1].classList.add("today");
      this.year_month.textContent = `${this.year}년 ${this.month + 1}월`;
      this.today.setFullYear(this.year);
      this.today.setMonth(this.month);
    });
    this.nextMonth.addEventListener("click", () => {
      this.viewDays[this.firstDay + this.date - 1].classList.remove("today");
      this.setmonth(1);
    });
  }

  //method
  getFirstDaysInMonth = (month, year) => {
    // Here January is 1 based 
    return new Date(year, month, 1).getDay();
  };
  getDaysInMonth = (month, year) => {
    //Day 0 is the last day in the previous month
    return new Date(year, month + 1, 0).getDate();
  };

  setmonth = (n) => {
    this.today.setDate(1);
    this.today.setMonth(this.today.getMonth() + n);

    const newyear = this.today.getFullYear();
    const newmonth = this.today.getMonth();
    const newdayOfTheWeek = this.today.getDay();
    const newdate = this.today.getDate();

    const switchMonth = newmonth + 1;
    this.saveDate = `${newyear}${switchMonth < 10 ? `0${switchMonth}` : switchMonth}`;
    this.year_month.textContent = `${newyear}년 ${switchMonth}월`;

    const newfirstDay = this.getFirstDaysInMonth(newmonth, newyear);
    const newDaysInMonth = this.getDaysInMonth(newmonth, newyear);
    const newDaysInLastMonth = this.getDaysInMonth(newmonth - 1, newyear);

    this.writeDate(newfirstDay, newDaysInMonth,
      newDaysInLastMonth, newmonth, newyear);

    // today 표시하기
    if (newyear === this.year && newmonth === this.month)
      this.viewDays[this.firstDay + this.date - 1].classList.add("today");
    return this.saveDate;
  }

  writeDate = (firstDay, DaysInMonth, DaysInLastMonth, m, y) => {
    let cnt = 1;

    // 이번달 그려주기
    for (let i = firstDay; i < firstDay + DaysInMonth; i++) {
      const newdays = i - firstDay + 1;
      const RealsaveDate = `${y}${`${m + 1}` < 10 ? `0${m + 1}` : `${m + 1}`}${newdays < 10 ? `0${newdays}` : newdays
        }`;
      const pageDate = Number(RealsaveDate);
      const presentLocal = localStorage.getItem(pageDate);
      if (presentLocal !== null) {
        this.viewDays[i].classList.add("presentTodo");
      } else {
        this.viewDays[i].classList.remove("presentTodo");
      }
      this.viewDays[i].textContent = `${i - firstDay + 1}`;
      this.viewDays[i].classList.remove("notAMonth");
      this.viewDays[i].parentElement.classList.remove("noClick");
    }

    this.showLastMonth()
    this.drawNextMonth(firstDay, DaysInMonth)
    this.drawPrevMonth(firstDay, DaysInLastMonth)

  }
  showLastMonth = () => {
    const lastWeek = this.viewDays[this.firstDay + this.DaysInMonth - 1].parentElement.parentElement;
    if (lastWeek.classList.contains("blockline6")) {
      this.blockline6.classList.remove("hidden");
    } else {
      this.blockline6.classList.add("hidden");
    }
  }
  drawNextMonth = (firstDay, DaysInMonth) => {
    let cnt = 1;
    for (let i = firstDay + DaysInMonth; i < this.viewDays.length; i++) {
      this.viewDays[i].textContent = `${cnt}`;
      this.viewDays[i].parentElement.classList.add("noClick");
      this.viewDays[i].classList.add("notAMonth");
      this.viewDays[i].classList.remove("presentTodo");
      cnt += 1;
    }
  }
  drawPrevMonth = (firstDay, DaysInLastMonth) => {
    let cnt = DaysInLastMonth;
    for (let i = firstDay - 1; i > -1; i--) {
      this.viewDays[i].textContent = `${cnt}`;
      this.viewDays[i].parentElement.classList.add("noClick");
      this.viewDays[i].parentNode.parentNode.parentNode.onclick = false;
      this.viewDays[i].classList.add("notAMonth");
      this.viewDays[i].classList.remove("presentTodo");
      cnt -= 1;
    }
  }

  init = () => {
    this.writeDate(this.firstDay, this.DaysInMonth, this.DaysInLastMonth,
      this.month, this.year);
    this.viewDays[this.firstDay + this.date - 1].classList.add("today");
    this.setmonth(0);
    this.year_month.textContent = `${this.year}년 ${this.month + 1}월`;
  }
}


const calendar = new Calendar()
calendar.init()