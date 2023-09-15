
#WinWait("Choose Files to Import")
$hWnd = WinWaitActive ("Choose Files to Import","",20)

If Not $hWnd Then
    
	WinActivate("Choose Files to Import")
	
EndIf
$hWnd2 = WinWaitActive ("Choose Files to Import","",20)

If Not $hWnd2 Then
    
	WinActivate("Choose Files to Import")
	
EndIf

Sleep(500)

Send("C:\TCUIProject\input\")
Send("{ENTER}")
Sleep(1000)
ControlClick("Choose Files to Import","","[CLASS:DirectUIHWND; INSTANCE:2]")
Sleep(1000)
Send("^a")
Send("{ENTER}")

