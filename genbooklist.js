// ==UserScript==
// @name         GenBooklist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Generate a copy of book list from various sites.
// @author       You
// @match        https://read.readmoo.com/*
// @match        https://www.kobo.com/tw/zh/library*
// @match        https://viewer-ebook.books.com.tw/viewer/*
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

    // readmoo.com
    let readmooSite = {
        getBookList: function() {
            return document.getElementsByClassName('library-item-info');
        },
        noListMsg: function() {
            return '找不到書籍列表. 請切換到書櫃並選擇為列表顯示.';
        },
        transformBookItem: function(item) {
            let name = item.getElementsByClassName('title')[0].innerText;
            let author = item.getElementsByClassName('author')[0].innerText;
            return {name: name, author: author}
        }
    }

    // kobo.com
    let koboSite = {
        getBookList: function() {
            return document.getElementsByClassName('book-list')[0].getElementsByClassName('element-flipper');
        },
        noListMsg: function() {
            return '找不到書籍列表.';
        },
        transformBookItem: function(item) {
            if (item.getElementsByClassName('buy-now').length > 0) {
                return undefined;
            }
            let itemInfo = item.getElementsByClassName('item-info')[0];
            let name = itemInfo.getElementsByClassName('title')[0].innerText;
            let author = itemInfo.getElementsByClassName('authors')[0].innerText;
            return {name: name, author: author}
        }
    }

    // books.com.tw
    let booksSite = {
        getBookList: function() {
            return document.getElementsByClassName('bookshelf__book');
        },
        noListMsg: function() {
            return '找不到書籍列表.';
        },
        transformBookItem: function(item) {
            let name = item.getElementsByClassName('book__description__title')[0].innerText;
            let author = item.getElementsByClassName('book__description__author')[0].innerText.replace('作者：', '');
            return {name: name, author: author}
        }
    }

    let makeGenerator = function (site) {
        return function() {
            let bookList = site.getBookList();
            if (bookList.length == 0) {
                alert(site.noListMsg);
                return;
            }

            const books = []
            for (let i = 0; i < bookList.length; i++) {
                let item = site.transformBookItem(bookList[i]);
                if (item === undefined) { continue; }
                books.push(item);
            }
            let msg = books
                .map(b => b.name + '\t' + b.author)
                .join('\n');

            let handler = createCopyHandler(msg);
            document.addEventListener('copy', handler);
            document.execCommand('copy');
            document.removeEventListener('copy', handler);
        }
    }

    GM_registerMenuCommand("Readmoo", makeGenerator(readmooSite));
    GM_registerMenuCommand("Kobo", makeGenerator(koboSite));
    GM_registerMenuCommand("Books", makeGenerator(booksSite));
})();