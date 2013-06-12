.PHONY: manifest
manifest:
		cp manifest $(DESTDIR)/$(DESTNAME)
update:
		git pull 
install:
		mkdir -p $(DESTDIR)/openNAS
		rsync -rupE --exclude .git ./* $(DESTDIR)/openNAS
world:
		npm install mdns
		mkdir -p /tmp/openNAS
		mv .git /tmp/openNAS
		../../../tools/scanner $(PWD)/../ openNAS > manifest 
		mv /tmp/openNAS/.git .git
		
