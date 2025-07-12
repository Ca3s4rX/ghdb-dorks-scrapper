
    loadImage = ()=>{
        var img = document.createElement('img');
        img.src = 'https://raw.githubusercontent.com/Ca3s4rX/images/main/kali-exploitdb.png';
        img.style = `
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:200px;
        height:200px;
        border-radius:50%;
        background:#fff;
        padding:10px;
        box-shadow:0 0 20px rgba(0,0,0,0.5);
        transition:opacity 1s ease;
        z-index:9999;
        opacity:1;
                    `;
        document.body.appendChild(img);
        return img
    }

    hideImage = (img)=>{
        img.style.opacity = '0';
    }

    removeImage = (img)=>{
        img.remove();
    }

    display_auther_details = ()=>{
        console.clear()
        console.log('================= Google Hacking Collector Script =================');
        console.log('👨‍💻 Scripted by: Ca3s4rX');
        console.log('🌐 Github: https://github.com/Ca3s4rX/');
        console.log('===================================================================')
        console.log('')
    }

    saveIntoJsonFile = (fileName)=>{
        blob = new Blob([JSON.stringify(result, null, 4)], { type: 'application/json' });
        url = URL.createObjectURL(blob);
        a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

    displayMessage = (message, newLine, before, after) => {
        if(newLine && before) console.log(' ')
        console.log(message)
        if(newLine && after) console.log(' ')
    }

    setTimeout(() => {
        img = loadImage();
        setTimeout(() => {
            hideImage(img);
            setTimeout(() => {
                removeImage(img)
                setTimeout(() => {
                    display_auther_details();
                    displayMessage(`                   📥 [+] Starts at ${new Date().toLocaleTimeString()} 📥`);
                    

                    displayMessage('⚙️ [+] Changing Show to 120 items ...');
                    select = document.querySelector('[name=exploits-table_length]');
                    select.value = 120
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    displayMessage('✅ [=] Done', true, false, true)
                    
                    
                    displayMessage('📂 [INF] Collecting Categories ...');
                    result = {}
                    categories = document.querySelectorAll('.selectize-dropdown-content > div')
                    displayMessage(`✅ [=] Collected ${categories.length} categories.`, true, false, true)

                    
                    setTimeout(() => {
                        index = 0; counter = 1; flag = true;
                        collector = setInterval(() => {
                            if (flag) {
                                categories[index].click();
                                setTimeout(() => {
                                    category = categories[index].innerText.split('\n').filter(v => v.trim() != '')[0].trim()
                                    result[category] = []
                                    displayMessage('📂 [INF] Collecting "' + category + '" Dorks ...');
                                    flag = false
                                }, 1500)
                            }

                            else {
                                table = document.querySelector('tbody')
                                result[category].push(...[...table.querySelectorAll('tr > td:not([class])')].map(v => v.innerText))

                                nextButton = document.querySelector('#exploits-table_next');
                                if (!nextButton.classList.contains('disabled')) {
                                    displayMessage('    ➡️ [+] Next ' + (counter++) + ' ...');
                                    nextButton.click();
                                }
                                else {
                                    displayMessage(`✅ [=] Collected ${result[category].length} dorks.`, true, false, true)
                                    index++
                                    flag = true
                                    counter = 1
                                    if (index == categories.length) {
                                        displayMessage('                   🎯 Ends at ' + new Date().toLocaleTimeString() + ' 🎯 ');
                                        now = new Date();
                                        date = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`
                                        
                                        result["_meta"] = {
                                            "collected_by": "Ca3s4rX",
                                            "repository": "https://github.com/Ca3s4rX/javascript_projects/",
                                            "generated_on": date
                                        };

                                        fileName = `ghdb_result_${date}.json`;
                                        saveIntoJsonFile(fileName)
                                        displayMessage('✅ [✔] File Saved As: ' + fileName);
                                        displayMessage('🎉 [✔] Thanks for using this tool!');
                                        displayMessage('👉 [Repo] https://github.com/Ca3s4rX/javascript_projects/', true, false, true);
                                        displayMessage('🚀==============================================================🚀');
                                        clearInterval(collector);
                                    }
                                }
                            }
                        }, 2500)
                    }, 1000)
                }, 100);  // slight delay to start after fade-out
            }, 1000);  // wait for fade-out
        }, 1500);   // show splash for 1.5 sec
    }, 500);