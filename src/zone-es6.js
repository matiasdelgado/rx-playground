let zoneSpec = {
    onInvoke(parent, current, target, task, applyThis, args) {
        console.log("Invoke: ", task);
        if (task.name !== "alert") {
            parent.invoke(target, task);
        } else {
            console.log("alert", args);
        }
    },
    onScheduleTask(parent, current, target, task) {
        console.log("Schedule", task);

        parent.scheduleTask(target, task);
    },
    onInvokeTask(parent, current, target, task) {
        console.log('Invoking ', task);
        parent.invokeTask(target, task);
    },
    onHasTask(parent, current, target, hasTask) {
        if (hasTask.macroTask) {
            console.log("There are outstanding MacroTasks.");
        } else {
            console.log("All MacroTasks have been completed.");
        }
    }
};
let myZone = Zone.current.fork(zoneSpec);
myZone.run(main);

function main() {
    A();
    alert("@AngularMVD");
    B();

    let p = new Promise((resolve) => {
        setTimeout(() => {
            resolve(1891);
        }, 100);
    });
    p.then((val) => {
        console.log(val);        
    }).then(() => {
        console.log("then");
    });

    b2.addEventListener("click", ()  => {
        console.log("click");
        
    })
}

function A() {
    setTimeout(() => {
        console.log("Hola A");
    }, 1000);
}
function B() {
    console.log("Hola B");
}