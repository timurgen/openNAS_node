.PHONY: manifest
manifest:
		cp manifest $(DESTDIR)/$(DESTNAME)
update:
		git pull 
install:
		mkdir -p $(DESTDIR)/openNAS
		rsync -rupE --exclude .git ./* $(DESTDIR)/openNAS
world:
		
