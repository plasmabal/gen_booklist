gen_booklist is a Tampermonkey script for generating book list from various books sites.

In the supported pages, there will be a Tampermonkey > GenBooklist item in the context menu.  You can choose the appropriate action under the menu item.  Book info on the page will be collected in your pasteboard, and they are ready to be pasted into Excel or Google Sheet.

This script is inspired by https://docs.google.com/presentation/d/1WMrwjj6R927XEYJKVX4eqGnJKkJ9s-8wTrl8ckd9ws8/edit?fbclid=IwAR1BDVfNE1L2uIowHP97S768LXodbvTzokMpzdA9oP1KBEhio6kBDHnMrJI#slide=id.gc2c595ec36_0_7 written by 高振綱, who shared this in the Facebook Group "Readmoo讀墨×mooInk 線上討論區".  I ported it to Tampermonkey as I couldn't make the booklet work on Microsoft Edge, which is my current browser at the time of writing.

# How to install

1. Make sure Tampermonkey is installed in your favorite browser.  For more information, check https://www.tampermonkey.net/ .
2. Open Tampermonkey extension.  Select "Create a new script".
3. Paste contents at https://raw.githubusercontent.com/plasmabal/gen_booklist/master/genbooklist.js and save.

# How to use

This script can be used on the following sites:

## Readmoo (https://read.readmoo.com/)

* Go to Bookshelf and select Books (書櫃 > 書籍).
* Make sure the display mode is Listing (列表).
* You may want to apply different sorting and filter.
* You may want to scroll down for a while to load more books.
* Right click on the page to show context menu.  Select Tampermonkey > GenBooklist > Readmoo.  Then book info in the listing will be collected in your pasteboard.

## Kobo (https://www.kobo.com/tw/zh/library)

* You may want to apply different sorting and items per page.
* Right click on the page to show context menu.  Select Tampermonkey > GenBooklist > Kobo.  Then book info in the listing will be collected in your pasteboard.

## Books (https://viewer-ebook.books.com.tw/viewer/index.html)

* You may want to apply different sorting and filtering.
* Right click on the page to show context menu.  Select Tampermonkey > GenBooklist > Books.  Then book info in the listing will be collected in your pasteboard.

## HyRead (http://ebook.hyread.com.tw/Template/store/member/my_bookcase_column_list.jsp)

* Only Listing is supported.
* Right click on the page to show context menu.  Select Tampermonkey > GenBooklist > HyRead.  Then book info in the listing will be collected in your pasteboard.

## Pubu (https://www.pubu.com.tw/bookshelf)

* Right click on the page to show context menu.  Select Tampermonkey > GenBooklist > Pubu.  Then book info in the listing will be collected in your pasteboard.

## Google Play Books (https://play.google.com/books)

* Right click on the page to show context menu.  Select Tampermonkey > GenBooklist > Google Play Books.  Then book info in the listing will be collected in your pasteboard.

# Other things

Patches welcome. :)
