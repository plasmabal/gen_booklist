// ==UserScript==
// @name         GenBooklist
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Generate a copy of book list from various sites.
// @author       You
// @match        https://read.readmoo.com/*
// @match        https://www.kobo.com/tw/zh/library*
// @match        https://viewer-ebook.books.com.tw/viewer/*
// @match        http://ebook.hyread.com.tw/Template/store/member/my_bookcase_column_list.jsp*
// @match        https://www.pubu.com.tw/bookshelf*
// @match        https://play.google.com/books*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @homepageURL  https://github.com/plasmabal/gen_booklist
// @updateURL    https://raw.githubusercontent.com/plasmabal/gen_booklist/master/genbooklist.js
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
        isCorrectHost: function(host) {
            return (host == "read.readmoo.com");
        },
        hostErrMsg: function() {
            return "請在讀墨書櫃裡使用";
        },
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
        isCorrectHost: function(host) {
            return (host == "www.kobo.com");
        },
        hostErrMsg: function() {
            return "請在 Kobo 裡使用";
        },
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
        isCorrectHost: function(host) {
            return (host == "viewer-ebook.books.com.tw");
        },
        hostErrMsg: function() {
            return "請在博客來電子書櫃裡使用";
        },
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

        // ebook.hyread.com.tw
    let hyreadSite = {
        isCorrectHost: function(host) {
            return (host == "ebook.hyread.com.tw");
        },
        hostErrMsg: function() {
            return "請在 HyRead 書櫃裡使用";
        },
        getBookList: function() {
            return document.getElementsByClassName('bookcase_list_item');
        },
        noListMsg: function() {
            return '找不到書籍列表.';
        },
        transformBookItem: function(item) {
            let name = item.getElementsByClassName('bookname')[0].innerText;
            let author = item.getElementsByClassName('bookname')[1].innerText;
            return {name: name, author: author}
        }
    }

    // www.pubu.com.tw
    let pubuSite = {
        isCorrectHost: function(host) {
            return (host == "www.pubu.com.tw");
        },
        hostErrMsg: function() {
            return "請在 Pubu 我的內容裡使用";
        },
        getBookList: function() {
            return document.getElementsByClassName('allBook');
        },
        noListMsg: function() {
            return '找不到書籍列表.';
        },
        transformBookItem: function(item) {
            let name = item.getElementsByTagName('h3')[0].innerText;
            return {name: name, author: ''}
        }
    }

    // https://play.google.com/books
    let googleBooksSite = {
        isCorrectHost: function(host) {
            return (host == "play.google.com");
        },
        hostErrMsg: function() {
            return "請在 Google Play Books 我的書籍裡使用";
        },
        getBookList: function() {
            return document.getElementsByClassName('ebook');
        },
        noListMsg: function() {
            return '找不到書籍列表.';
        },
        transformBookItem: function(item) {
            let coverBadges = item.getElementsByClassName('cover-badge');
            if (coverBadges.length > 0 && coverBadges[0].innerText == '試閱內容') {
                return undefined;
            }
            let name = item.getElementsByClassName('title')[0].innerText;
            let author = item.getElementsByClassName('author')[0].innerText;
            return {name: name, author: author}
        }
    }

    let makeGenerator = function (site) {
        return function() {
            if (!site.isCorrectHost(window.location.host)) {
                alert(site.hostErrMsg());
                return;
            }
            let bookList = site.getBookList();
            if (bookList.length == 0) {
                alert(site.noListMsg());
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

            alert(books.length + " books is collected.");
        }
    }

    GM_registerMenuCommand("Books", makeGenerator(booksSite));
    GM_registerMenuCommand("HyRead", makeGenerator(hyreadSite));
    GM_registerMenuCommand("Kobo", makeGenerator(koboSite));
    GM_registerMenuCommand("Pubu", makeGenerator(pubuSite));
    GM_registerMenuCommand("Readmoo", makeGenerator(readmooSite));
    GM_registerMenuCommand("Google Play Books", makeGenerator(googleBooksSite));
})();