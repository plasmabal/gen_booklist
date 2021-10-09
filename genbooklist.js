// ==UserScript==
// @name         GenBooklist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Generate a copy of book list from various sites.
// @author       You
// @match        https://read.readmoo.com/*
// @match        https://www.kobo.com/tw/zh/library*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    let createCopyHandler = function(msg) {
        return function(event) {
            event.clipboardData.setData('text', msg);
            event.preventDefault();
        };
    };

    let generateReadmooBookList = function() {
        let bookList = document.getElementsByClassName('library-item-info');
        if (bookList.length == 0) {
            alert('找不到書籍列表. 請切換到書櫃並選擇為列表顯示.');
            return;
        }

        let msg = '';
        for (let i = 0; i < bookList.length; i++) {
            let name = bookList[i].getElementsByClassName('title')[0].innerText;
            let author = bookList[i].getElementsByClassName('author')[0].innerText;
            msg += name + '\t' + author + '\n';
        }

        let handler = createCopyHandler(msg);
        document.addEventListener('copy', handler);
        document.execCommand('copy');
        document.removeEventListener('copy', handler);
    }

    let generateKoboBookList = function() {
        let bookList = document.getElementsByClassName('book-list')[0].getElementsByClassName('element-flipper');
        if (bookList.length == 0) {
            alert('找不到書籍列表.');
            return;
        }

        let msg = '';
        for (let i = 0; i < bookList.length; i++) {
            if (bookList[i].getElementsByClassName('buy-now').length > 0) {
                continue;
            }
            let itemInfo = bookList[i].getElementsByClassName('item-info')[0];
            let name = itemInfo.getElementsByClassName('title')[0].innerText;
            let author = itemInfo.getElementsByClassName('authors')[0].innerText;
            msg += name + '\t' + author + '\n';
        }

        let handler = createCopyHandler(msg);
        document.addEventListener('copy', handler);
        document.execCommand('copy');
        document.removeEventListener('copy', handler);
    }

    GM_registerMenuCommand("Readmoo", generateReadmooBookList);
    GM_registerMenuCommand("Kobo", generateKoboBookList);
})();