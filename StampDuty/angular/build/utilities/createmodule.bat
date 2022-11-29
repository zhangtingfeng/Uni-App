set projectname=%1
set modulename=%2
ng generate component test/presentation/activities/%modulename% --prefix am-%modulename% --styleext scss --spec false --project %projectname% --selector am-%modulename% 
ng generate class test/presentation/activities/%modulename%/%modulename% --spec false --project %projectname% --type viewmodel 
ng generate class test/domainmodels/%modulename% --spec false --project %projectname% --type model 
ng generate class test/domainmodels/metadata/%modulename% --spec false --project %projectname% --type metadata 
