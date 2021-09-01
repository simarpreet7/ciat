//https://www.youtube.com/watch?v=Ytu5yXHhiVc
//C:\\Users\\VORTON\\OneDrive\\Desktop\\optum\\work\\tests
//C:\\Users\\VORTON\\OneDrive\\Desktop\\optum\\work\\input.txt
//[20:35] Dasgupta, Atarpan
//https://www.youtube.com/watch?v=3yqDxhR2XxE
//bulma.io
//electron issue with exe 


//divider line + fit to screen + black box responsive + file upload ui
const {app,BrowserWindow,Menu,ipcMain,screen} = require('electron')
const cmd=require('node-cmd');
const os=require('os')
let count=0;
ipcMain.on('search',(event,data)=>{
    if(os.type()=="Windows_NT"){
        var cmdStr='cd backend && final-win.exe '+data.file+" "+data.input 
    }
    else if(os.type()=="Linux"){
       // let cmdStr='cd backend && final-win.exe '+data.file+" "+data.input
       console.log("linux")
       var cmdStr = "error for linux"
    }
    else if(os.type()=="Darwin"){
       // let cmdStr='cd backend && final-win.exe '+data.file+" "+data.input
       console.log("mac os")
       var cmdStr = "error for mac os"
    }
    else{
        console.log("unknown os")
        var cmdStr = "error for unknown os"
    }
    console.log(cmdStr)
    const processRef=cmd.run(cmdStr);
    processRef.stdout.on(
    'data',
    function(data) {
        count++;
        // let dataObj=JSON.stringify(data.obj)
         console.log(data.split('\n'))
        data.split('\n').forEach(element => {
            if(element!='')
            event.reply('logs',{logs:element,total:JSON.parse(element).total,current:JSON.parse(element).line}) 
        });
    }
    );
})
function createWindow(){
    const screenElectron = screen;
    const display = screenElectron.getPrimaryDisplay();
    const dimensions = display.workAreaSize;
    // console.log(dimensions.width*0.7,dimensions.height*0.6)
    let w=1076//dimensions.width*0.7
    let h=525//dimensions.height*0.6
    const window=new BrowserWindow({
        width: parseInt(w),//dimensions.width*0.7),
        height: parseInt(h),//dimensions.height*0.6),
        minWidth: parseInt(w),//dimensions.width * 0.5),
        minHeight: parseInt(h),//dimensions.height * 0.5),
        maxWidth: parseInt(w),//dimensions.width,
        maxHeight: parseInt(h),//dimensions.height,
        icon:"./assets/optum.png",
        title:"C.I.A.T",
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        },
        autoHideMenuBar: true,
    })
    window.loadFile('index.html')
    // window.webContents.openDevTools();
    //window.maximize();
}
app.whenReady().then(createWindow)