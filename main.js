
var Task = function(id, name) {
    this.id = id;
    this.name = name;
    this.created_at = new Date().toISOString().slice(0,16).replace(/-/g,".").replace(/T/, ' ');

    this.updated_at =  new Date();
    this.progress = 0;
    this.active = true;

};

var users = [
    {
        id: 1,
        name: 'Сергей'
    },
    {
        id: 2,
        name: 'Евгений'
    },
    {
        id: 3,
        name: 'Алексей'
    },
    {
        id: 4,
        name: 'Аделина'
    },
    {
        id: 5,
        name: 'Ирина'
    },
    {
        id: 6,
        name: 'Александр'
    },
    {
        id: 7,
        name: 'Дмитро'
    },
];

var User = function (id, name) {
  this.id = id;
  this.name = name;
  this.tasks = new Object();
  this.taskId = 0;

};

User.prototype.createNewTask = function () {
if(this.input_createNewTask.value == '') {
    return
}
    var ob = new Task( this.taskId++, this.input_createNewTask.value);

        this.tasks[ob.id ] = ob;
        this.input_createNewTask.value = '';


        this.renderRightBar();


};

User.prototype.deleteTask = function (id) {
    console.log(id)


     delete this.tasks[id];
     this.renderRightBar();
};

User.prototype.renderUserList = function () {
    this.elLeftMenu = document.createElement('li');
    this.elLeftMenu.addEventListener( "click" , this.renderRightBar.bind(this) );

    this.elLeftMenu.innerText = this.name;
    document.getElementById('userList').appendChild(this.elLeftMenu);



};



User.prototype.renderRightBar = function () {

        var rightBar = document.getElementById('rightBarList');
        rightBar.innerHTML = '';
        rightBar.appendChild(this.rightBarTitle);
        rightBar.appendChild(this.input_createNewTask);
        rightBar.appendChild(this.btn_createNewTask);







        for(var key in this.tasks) {
            this.tasks[key].name
            this.tasks[key].el = document.createElement('div');
            this.tasks[key].el.innerHTML = '<div class="task-item-title">'+ this.tasks[key].name; + '</div>';
            this.tasks[key].el.className = 'task-list-item';

            this.tasks[key].span_NewTaskDate = document.createElement('span');
            this.tasks[key].span_NewTaskDate.innerHTML = 'Дата создания: ' + this.tasks[key].created_at;
            this.tasks[key].span_NewTaskDate.className = 'task-created-date';

            this.tasks[key].deleteTaskButton = document.createElement('span');
            this.tasks[key].deleteTaskButton.innerHTML = '&times;';
            this.tasks[key].deleteTaskButton.className = 'task-delete-button';



            this.tasks[key].deleteTaskButton.addEventListener('click' , this.deleteTask.bind(this,this.tasks[key].id));


            rightBar.appendChild(this.tasks[key].el);
            this.tasks[key].el.appendChild(this.tasks[key].deleteTaskButton);
            this.tasks[key].el.appendChild(this.tasks[key].span_NewTaskDate);
        }




};
User.prototype.initRightBar = function () {
    this.btn_createNewTask = document.createElement('button');
    this.btn_console = document.createElement('button');
    this.rightBarTitle = document.createElement('h2');
    this.rightBarTitle.innerText = this.name;
    this.rightBarTitle.className = 'right-bar-user-title';
    this.input_createNewTask = document.createElement('input');
    this.input_createNewTask.className = 'create-task-input';
    this.input_createNewTask.setAttribute('placeholder', 'Введите название задачи');


    this.btn_createNewTask.innerText = 'Создать задачу';
    this.btn_console.innerText = 'Вывести в консоль';

    this.btn_createNewTask.addEventListener( "click" , this.createNewTask.bind(this) );

};




function init() {
  for(var i in users){
      users[i] = new User(users[i].id,users[i].name);
      users[i].renderUserList();
      users[i].initRightBar();


  }


};

init();




