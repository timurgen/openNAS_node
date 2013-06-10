PROTO_AREA =	$(PWD)/../../../proto

manifest:
		cp manifest $(DESTDIR)/$(DESTNAME)
update:
		git pull --rebase
install:
		mkdir $(DESTDIR)/openNAS
		rsync -rupE ./* $(DESTDIR)/openNAS
world:
		
