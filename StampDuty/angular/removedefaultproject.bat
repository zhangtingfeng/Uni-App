rmdir /s /q e2e
rmdir /s /q src
rmdir /s /q package-lock.json
Pushd packages
del /s /q **.spec.ts test.ts karma.conf.ts karma.conf.js tsconfig.spec.json tslint.json

Pushd applications
for /d %%n in (*e2*) do rmdir /s /q "%%n"
cd..
cd..
