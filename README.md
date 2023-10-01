gen_booklist is a Tampermonkey script for generating book list from various books sites.

In the supported pages, there will be a Tampermonkey > GenBooklist item in the context menu.  You can choose the appropriate action under the menu item.  Book info on the page will be collected in your pasteboard, and they are ready to be pasted into Excel or Google Sheet.

This script is inspired by https://docs.google.com/presentation/d/1WMrwjj6R927XEYJKVX4eqGnJKkJ9s-8wTrl8ckd9ws8/edit?fbclid=IwAR1BDVfNE1L2uIowHP97S768LXodbvTzokMpzdA9oP1KBEhio6kBDHnMrJI#slide=id.gc2c595ec36_0_7 written by 高振綱, who shared this in the Facebook Group "Readmoo讀墨×mooInk 線上討論區".  I ported it to Tampermonkey as I couldn't make the booklet work on Microsoft Edge, which is my current browser at the time of writing.

# How to install

1. Make sure Tampermonkey is installed in your favorite browser.  For more information, check https://www.tampermonkey.net/ .
2. Open Tampermonkey extension.  Select "Create a new script".
3. Paste contents at https://raw.githubusercontent.com/plasmabal/gen_booklist/master/genbooklist.js and save.

# How to use

* Open your browser and load the book shelf page.
* Since the script can only collect books on the web page, make sure you have the correct ordering and/or filtering before start the action.
* Tap the right button to bring up the context menu.  If the site is correct and the link is right, you should see Tampermonkey in the context menu.
* Tap the Tapermonkey item, tap GenBooklist, and tap the appropriate action.
* If everything goes well, the script will fetch book info (title and author) and paste into the pasteboard with the following message: `xx books are collected.`
* You can open your Excel or Goole Sheet and paste it.

# Supported sites

* Readmoo (https://read.readmoo.com/). Bookself > Books and Listing only (書櫃 > 書籍, 列表).
* Kobo (https://www.kobo.com/tw/zh/library).
* Books (https://viewer-ebook.books.com.tw/viewer/index.html).
* HyRead (http://ebook.hyread.com.tw/Template/store/member/my_bookcase_column_list.jsp). Listing only.
* Pubu (https://www.pubu.com.tw/bookshelf).
* Google Play Books (https://play.google.com/books).
* MyBook (https://mybook.taiwanmobile.com/bookcase/list).
* Amazon US (https://www.amazon.com/hz/mycd/digital-console/contentlist/).
* HamiBook (https://webreader.hamibook.com.tw/HamiBookcase#/).
* Amazon CN (https://www.amazon.cn/hz/mycd/digital-console/contentlist/).
* BOOKWALKER TW (https://www.bookwalker.com.tw/bookcase/available_book_list)

# Other things

Patches welcome. :)
