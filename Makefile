
.PHONY: manifest
manifest:
		cp manifest $(DESTDIR)/$(DESTNAME)
update:
		git pull 
install:
		mkdir $(DESTDIR)/openNAS
		rsync -rupE --exclude .git ./* $(DESTDIR)/openNAS
world:
		
