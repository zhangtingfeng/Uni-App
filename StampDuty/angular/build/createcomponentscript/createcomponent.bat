	
if [%1]==[] goto noarguments
	SETLOCAL ENABLEDELAYEDEXPANSION
	set componentname=%1
	set componentnamelowercase=%1
	CALL :LoCase componentnamelowercase
	rmdir /s /q %componentnamelowercase%
	mkdir %componentnamelowercase%
	xcopy *.exe %componentnamelowercase%
	xcopy /s template %componentnamelowercase%
	pushd %componentnamelowercase%
	del *.bat

	ren *template*.* %componentnamelowercase%.*.*

	pushd traits
	ren *template*.* %componentnamelowercase%.*.*
	cd..
	
	pushd domainmodels
	ren *template*.* %componentnamelowercase%.*.*
	
	pushd traits
	ren *template*.* %componentnamelowercase%.*.*

	cd..
	cd..

	Call replacestringinfile.exe -r "*.*" template %componentnamelowercase%
	Call replacestringinfile.exe -r "*.*" Template %componentname%
	Call replacestringinfile.exe -r "*.component.ts" %componentnamelowercase%Url templateUrl
	
	del *.exe

	cd..
	PAUSE
exit /B 1

:noarguments
@echo NoAruguments: Please pass component name as argument
PAUSE
exit /B 1


:TCase
:: Subroutine to convert a variable VALUE to Title Case.
:: The argument for this subroutine is the variable NAME.
FOR %%i IN (" a= A" " b= B" " c= C" " d= D" " e= E" " f= F" " g= G" " h= H" " i= I" " j= J" " k= K" " l= L" " m= M" " n= N" " o= O" " p= P" " q= Q" " r= R" " s= S" " t= T" " u= U" " v= V" " w= W" " x= X" " y= Y" " z= Z") DO CALL SET "%1=%%%1:%%~i%%"
GOTO:EOF


:LoCase
:: Subroutine to convert a variable VALUE to all lower case.
:: The argument for this subroutine is the variable NAME.
SET %~1=!%1:A=a!
SET %~1=!%1:B=b!
SET %~1=!%1:C=c!
SET %~1=!%1:D=d!
SET %~1=!%1:E=e!
SET %~1=!%1:F=f!
SET %~1=!%1:G=g!
SET %~1=!%1:H=h!
SET %~1=!%1:I=i!
SET %~1=!%1:J=j!
SET %~1=!%1:K=k!
SET %~1=!%1:L=l!
SET %~1=!%1:M=m!
SET %~1=!%1:N=n!
SET %~1=!%1:O=o!
SET %~1=!%1:P=p!
SET %~1=!%1:Q=q!
SET %~1=!%1:R=r!
SET %~1=!%1:S=s!
SET %~1=!%1:T=t!
SET %~1=!%1:U=u!
SET %~1=!%1:V=v!
SET %~1=!%1:W=w!
SET %~1=!%1:X=x!
SET %~1=!%1:Y=y!
SET %~1=!%1:Z=z!
GOTO:EOF