Date.prototype.getFormat = function(){
    var year = this.getFullYear();

    var month = '';
    this.getMonth() < 10 ? month = '0' + (this.getMonth()+1) : month =  (this.getMonth+1) ;

    var day = this.getDate();

    var hours = '';
    this.getHours() < 10 ? hours = '0' + (this.getHours()+1) : hours =  (this.getHours()+1) ;


    var minute = this.getMinutes();

    return year + '.' + month + '.' + day + '. ' + hours + ':' + minute ;

};

var Task = function(id, name,  description) {
    this.id = id;
    this.name = name;
    this.created_at = new Date().getFormat();
    this.description = description;

    this.updated_at =  new Date();
    this.progress = 0;
    this.active = true;


};

Task.prototype.changeProgress = function ($this) {
     this.progress = this.progressInput.value + '%';
    console.log(this.progress);
    $this.renderRightBar();
};

Task.prototype.toggleActive = function ($this) {

    this.active  = !this.active;

    $this.renderRightBar();
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
if(this.input_createNewTask.value == '' || this.input_descriptionTask.value == '') {
    return
}
    var ob = new Task( this.taskId++, this.input_createNewTask.value, this.input_descriptionTask.value );

        this.tasks[ob.id ] = ob;
        this.input_createNewTask.value = '';
        this.input_descriptionTask.value = '';


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
        rightBar.appendChild(this.input_descriptionTask);
        rightBar.appendChild(this.btn_createNewTask);


        for(var key in this.tasks) {
            this.tasks[key].name;
            this.tasks[key].description;
            this.tasks[key].active;
            this.tasks[key].el = document.createElement('div');
            this.tasks[key].el.innerHTML = '<div class="task-item-title">'+ this.tasks[key].name; + '</div>';
            this.tasks[key].el.className = 'task-list-item';

            this.tasks[key].desc = document.createElement('div');
            this.tasks[key].desc.innerHTML = '<div class="task-item-description">'+ this.tasks[key].description; + '</div>';


            this.tasks[key].span_NewTaskDate = document.createElement('span');
            this.tasks[key].span_NewTaskDate.innerHTML = 'Дата создания: ' + this.tasks[key].created_at;
            this.tasks[key].span_NewTaskDate.className = 'task-created-date';

            this.tasks[key].deleteTaskButton = document.createElement('span');
            this.tasks[key].deleteTaskButton.innerHTML = '&times;';
            this.tasks[key].deleteTaskButton.className = 'task-delete-button';


            this.tasks[key].btn_active = document.createElement('div');
            this.tasks[key].btn_active.className = 'btn-active';
            this.tasks[key].btn_active.innerText = '';


            this.tasks[key].progressInput = document.createElement('input');
            this.tasks[key].progressInput.className = 'progress-input';

            this.tasks[key].progressVal = document.createElement('div');
            this.tasks[key].progressVal.className = 'progress-value';
            this.tasks[key].progressVal.innerText = this.tasks[key].progress;




            this.tasks[key].progressInput.addEventListener('change' , this.tasks[key].changeProgress.bind(this.tasks[key], this));


            this.tasks[key].btn_active.addEventListener('click',this.tasks[key].toggleActive.bind(this.tasks[key], this));
            console.log('getActive', this.tasks[key].active);
            this.tasks[key].active ? this.tasks[key].btn_active.innerHTML = "<div>Статус задачи: <span class='active'> В работе &#8635;</span></div>" : this.tasks[key].btn_active.innerHTML = "<div>Статус задачи: <span class='complete'>Выполнена 	&#9745;</span></div>";




            this.tasks[key].deleteTaskButton.addEventListener('click' , this.deleteTask.bind(this,this.tasks[key].id));


            rightBar.appendChild(this.tasks[key].el);
            this.tasks[key].el.appendChild(this.tasks[key].span_NewTaskDate);
            this.tasks[key].el.appendChild(this.tasks[key].desc);
            this.tasks[key].el.appendChild(this.tasks[key].deleteTaskButton);
            this.tasks[key].el.appendChild(this.tasks[key].btn_active);
            this.tasks[key].el.appendChild(this.tasks[key].progressInput);
            this.tasks[key].el.appendChild(this.tasks[key].progressVal);


        }




};
User.prototype.initRightBar = function () {
    this.btn_createNewTask = document.createElement('button');
    this.btn_createNewTask.innerText = 'Создать задачу';
    this.btn_createNewTask.className = 'create-btn';

    this.btn_console = document.createElement('button');

    this.rightBarTitle = document.createElement('h2');
    this.rightBarTitle.innerText = this.name;
    this.rightBarTitle.className = 'right-bar-user-title';

    this.input_createNewTask = document.createElement('input');
    this.input_createNewTask.className = 'create-task-input';
    this.input_createNewTask.setAttribute('placeholder', 'Введите название задачи');

    this.input_descriptionTask = document.createElement('textarea');
    this.input_descriptionTask.className = 'create-task-description';
    this.input_descriptionTask.setAttribute('placeholder', 'Введите описание задачи');





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




