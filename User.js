class User {
    constructor({
        data,
        actions,
        root,
        className = '',
        autoAttach,
    }) {

        this.data = data;
        this.actions = actions;
        this.newName = this.data.name;
        this.newAge = this.data.age;
        
        this.root = root ? document.getElementById(root) : document.body;

        this.elementContainer = document.createElement('div');
        this.elementContainer.className = className;

        // Create delete button
        this.deleteButton = document.createElement('div');
        this.deleteButton.className = 'delete-button';
        this.deleteButtonSpan = document.createElement('button');
        this.deleteButtonSpan.innerText = 'x'
        this.deleteButtonSpan.addEventListener('click', this.del.bind(this));
        this.deleteButton.append(this.deleteButtonSpan);

        this.flag = false;

        // Create Name field
        this.rowName = document.createElement('row');
        this.inputNameTitle = document.createElement('span');
        this.inputNameTitle.innerText = 'User Name:'

        this.inputName = document.createElement('input');
        this.inputName.className = 'name';
        this.inputName.value = this.data.name;
        this.inputName.disabled = true;
        this.inputName.addEventListener('change', this.changeName.bind(this));

        this.rowName.append(this.inputNameTitle);
        this.rowName.append(this.inputName);

        // Create Age field
        this.rowAge = document.createElement('row');
        this.inputAgeTitle = document.createElement('span');
        this.inputAgeTitle.innerText = 'User Age:'

        this.inputAge = document.createElement('input');
        this.inputAge.type = 'number';
        this.inputAge.min=1;
        this.inputAge.max=130;
        this.inputAge.className = 'age';
        this.inputAge.value = this.data.age;
        this.inputAge.disabled = true;
        this.inputAge.addEventListener('change', this.changeAge.bind(this));

        this.rowAge.append(this.inputAgeTitle);
        this.rowAge.append(this.inputAge);

        // Create edit button
        this.button = document.createElement('button');
        this.button.innerText = 'Edit';
        this.button.addEventListener('click', this.edit.bind(this));
        
        if (autoAttach) {
            this.attach();
        }
    }
    
    attach() {
        // this.root.append(this.elementContainer);
        this.root.insertBefore(this.elementContainer, this.root.firstChild);
 
        this.elementContainer.append(this.deleteButton);

        this.elementContainer.append(this.rowName);
        this.elementContainer.append(this.rowAge);
        this.elementContainer.append(this.button);
    }
    
    detach() {
    	this.root.removeChild(this.elementContainer);
    }

    changeName(ev) {
        this.newName = ev.target.value;
    }
    changeAge(ev) {
        this.newAge = ev.target.value;
    }

    edit(ev) {
        if (this.flag === false) {
            this.inputName.disabled = false;
            this.inputAge.disabled = false;
            this.button.innerText = 'Save';
            this.button.classList.add('active');
            this.flag = !this.flag;

        } else {
            
            if (!this.newName || !this.newAge) {
                alert('All inputs must be filled');
            } if(this.newAge == 0 || this.newAge > 130) {
                alert('Age must be more them 0 and les 130');
            } 
            else {
                if (this.newName != this.data.name
                    || Number(this.newAge) != Number(this.data.age)) {

                        this.inputName.disabled = true;
                        this.inputAge.disabled = true;
                        this.button.innerText = 'Edit';
                        this.button.classList.remove('active');
                        this.flag = !this.flag;

                        this.actions.edit({
                            age: Number(this.newAge),
                            id: this.data.id,
                            name: this.newName
                    });    
                }
            }               
        }
        
    }
    del() {
        this.detach();
        this.actions.del(this.data.id);
    }
}