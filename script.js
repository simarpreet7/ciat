//https://www.youtube.com/watch?v=Ytu5yXHhiVc
//C:\\Users\\VORTON\\OneDrive\\Desktop\\optum\\work\\tests
//C:\\Users\\VORTON\\OneDrive\\Desktop\\optum\\work\\input.txt
//[20:35] Dasgupta, Atarpan
//https://www.youtube.com/watch?v=3yqDxhR2XxE
//bulma.io


//divider line + fit to screen + black box responsive + file upload ui
const {app,BrowserWindow,Menu,ipcMain,screen} = require('electron')
const cmd=require('node-cmd');
let count=0;
ipcMain.on('search',(event,data)=>{
    let cmdStr='cd backend && node final '+data.file+" "+data.input//+" "+"C:\Users\VORTON\OneDrive\Desktop\optum\work\ciat\result"
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
    let h=600//dimensions.height*0.6
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