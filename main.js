
var Task = function(id, name) {
    this.id = id;
    this.name = name;
    this.created_at = new Date();
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
    }
];

var User = function (id, name) {
  this.id = id;
  this.name = name;
  this.tasks = new Object();



};







User.prototype.createNewTask = function () {

    var ob = new Task(Object.keys(this.tasks).length, this.input_createNewTask.value);

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

        var rightBar = document.getElementById('rightBar');
        rightBar.innerHTML = '';
        rightBar.appendChild(this.btn_createNewTask);
        rightBar.appendChild(this.input_createNewTask);

1

        for(var key in this.tasks) {
            this.tasks[key].name
            this.tasks[key].el = document.createElement('div');
            this.tasks[key].el.innerText = this.tasks[key].name;
            this.tasks[key].el.className = 'task-list';

            this.tasks[key].el.addEventListener('click' , this.deleteTask.bind(this,this.tasks[key].id))
            rightBar.appendChild(this.tasks[key].el);
        }



};
User.prototype.initRightBar = function () {
    this.btn_createNewTask = document.createElement('button');
    this.btn_createNewTask.innerText = 'Создать задачу';
    this.input_createNewTask = document.createElement('input');
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




