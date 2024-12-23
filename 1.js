// 在选课页面F12-console 复制粘贴运行
// 支持必修课 选修课 限选课内能查询到的课 , 辅修和重修不存在课余量限制请自行选课
// 请按照下面两行的格式填入课程号和课序号
let kch = ['sd00123456', 'sd00810975'];
let kxh = ['119', '911'];
let kchid = [];
let kxhid = [];
let kctype = [];
let reqData = [
    { "name": "sEcho", "value": "1" },
    { "name": "iColumns", "value": "1" },
    { "name": "sColumns", "value": "" },
    { "name": "iDisplayStart", "value": "0" },
    { "name": "iDisplayLength", "value": "1" },
    { "name": "mDataProp_0", "value": "kch" },
    { "name": "mDataProp_1", "value": "kcmc" },
    { "name": "mDataProp_2", "value": "kxhnew" },
    { "name": "mDataProp_3", "value": "jkfs" },
    { "name": "mDataProp_4", "value": "xmmc" },
    { "name": "mDataProp_5", "value": "xf" },
    { "name": "mDataProp_6", "value": "skls" },
    { "name": "mDataProp_7", "value": "sksj" },
    { "name": "mDataProp_8", "value": "skdd" },
    { "name": "mDataProp_9", "value": "xqmc" },
    { "name": "mDataProp_10", "value": "xkrs" },
    { "name": "mDataProp_11", "value": "syrs" },
    { "name": "mDataProp_12", "value": "ctsm" },
    { "name": "mDataProp_13", "value": "szkcflmc" },
    { "name": "mDataProp_14", "value": "czOper" }
];

// Request configuration
const REQUEST_DELAY = 5000; // 5 seconds between requests
const BATCH_DELAY = 10000; // 10 seconds between batches

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Rate-limited AJAX request wrapper
async function rateLimit(fn) {
    try {
        const result = await fn();
        await delay(REQUEST_DELAY);
        return result;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

// Search functions with rate limiting
async function searchRX() {
    return rateLimit(() => new Promise((resolve, reject) => {
        $.ajax({
            type: "post",
            url: "/jsxsd/xsxkkc/xsxkGgxxkxk?kcxx=&skls=&skxq=&skjc=&sfym=false&sfct=true&szjylb=&sfxx=false&skfs=",
            data: reqData,
            success: function(resp) {
                resolve($.parseJSON(resp));
            },
            error: reject
        });
    }));
}

async function searchBX() {
    return rateLimit(() => new Promise((resolve, reject) => {
        $.ajax({
            type: "post",
            url: "/jsxsd/xsxkkc/xsxkBxxk?1=1&kcxx=&skls=&skfs=",
            data: reqData,
            success: function(resp) {
                resolve($.parseJSON(resp));
            },
            error: reject
        });
    }));
}

async function searchXX() {
    return rateLimit(() => new Promise((resolve, reject) => {
        $.ajax({
            type: "post",
            url: "/jsxsd/xsxkkc/xsxkXxxk?1=1&kcxx=&skls=&skfs=",
            data: reqData,
            success: function(resp) {
                resolve($.parseJSON(resp));
            },
            error: reject
        });
    }));
}

// Course selection functions with rate limiting
async function xsxkOper(_kchid, _kxhid) {
    return rateLimit(() => new Promise((resolve, reject) => {
        let bac = String(_kchid);
        var param = "?kcid=" + _kxhid + "&cfbs=null";
        $.ajax({
            url: "/jsxsd/xsxkkc/ggxxkxkOper" + param,
            data: {
                jx0404id: _kchid,
                xkzy: "",
                trjf: ""
            },
            success: function(resp) {
                resp = JSON.parse(resp);
                console.log(resp.message);
                if (resp.success == true) {
                    kxhid.splice(kchid.indexOf(bac), 1);
                    kctype.splice(kchid.indexOf(bac), 1);
                    kchid.splice(kchid.indexOf(bac), 1);
                }
                resolve();
            },
            error: reject
        });
    }));
}

async function xxxkOper(_kchid, _kxhid) {
    return rateLimit(() => new Promise((resolve, reject) => {
        let bac = String(_kchid);
        var param = "?kcid=" + _kxhid + "&cfbs=null";
        $.ajax({
            url: "/jsxsd/xsxkkc/xxxkOper" + param,
            data: {
                jx0404id: _kchid,
                xkzy: "",
                trjf: ""
            },
            success: function(resp) {
                resp = JSON.parse(resp);
                console.log(resp.message);
                if (resp.success == true) {
                    kxhid.splice(kchid.indexOf(bac), 1);
                    kctype.splice(kchid.indexOf(bac), 1);
                    kchid.splice(kchid.indexOf(bac), 1);
                }
                resolve();
            },
            error: reject
        });
    }));
}

// Main execution function
async function main() {
    try {
        // Get RX courses
        let RXdata = await searchRX();
        reqData[1].value = RXdata.iTotalRecords;
        reqData[4].value = RXdata.iTotalRecords;
        RXdata = await searchRX();

        // Reset request data
        reqData[1].value = 1;
        reqData[4].value = 1;

        // Get BX courses
        let BXdata = await searchBX();
        reqData[1].value = BXdata.iTotalRecords;
        reqData[4].value = BXdata.iTotalRecords;
        BXdata = await searchBX();

        // Reset request data
        reqData[1].value = 1;
        reqData[4].value = 1;

        // Get XX courses
        let XXdata = await searchXX();
        reqData[1].value = XXdata.iTotalRecords;
        reqData[4].value = XXdata.iTotalRecords;
        XXdata = await searchXX();

        // Match courses
        for (let i = 0; i < kch.length; i++) {
            for (let j of BXdata.aaData) {
                if (j.kch == kch[i] && j.kxh == kxh[i]) {
                    kchid.push(j.jx0404id);
                    kxhid.push(j.jx02id);
                    kctype.push(0);
                }
            }
            for (let j of RXdata.aaData) {
                if (j.kch == kch[i] && j.kxh == kxh[i]) {
                    kchid.push(j.jx0404id);
                    kxhid.push(j.jx02id);
                    kctype.push(1);
                }
            }
            for (let j of XXdata.aaData) {
                if (j.kch == kch[i] && j.kxh == kxh[i]) {
                    kchid.push(j.jx0404id);
                    kxhid.push(j.jx02id);
                    kctype.push(2);
                }
            }
        }

        // Start course selection loop with rate limiting
        while (kchid.length > 0) {
            for (let i = 0; i < kchid.length; i++) {
                if (kctype[i] == 1) {
                    await xsxkOper(kchid[i], kxhid[i]);
                } else {
                    await xxxkOper(kchid[i], kxhid[i]);
                }
            }
            // Wait between batches
            await delay(BATCH_DELAY);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Start the script
main();