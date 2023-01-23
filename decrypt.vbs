set x = WScript.CreateObject("WScript.Shell")
myFile = inputbox("enter text to be decoded")
myFile = StrReverse(myFile)
x.Run "%windir%\notepad"
WScript.sleep 1000
x.sendkeys encode(myFile)

function encode(s)
For i = 1 To Len(s)
newtxt = Mid(s, i, 1)
newtxt = Chr(Asc(newtxt)-7)
coded = coded & newtxt
Next
encode = coded
End Function