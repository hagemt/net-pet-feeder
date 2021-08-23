#define _POSIX_C_SOURCE (200809L)
#include <sys/types.h>
#include <sys/stat.h>
#include <fts.h>
#define _FTS_OPTIONS (FTS_PHYSICAL)

#include <assert.h>
#include <libgen.h>
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef char ch_t;
#define ch_w sizeof(ch_t)

static void
poll(FILE *fp) {
	size_t a, bytes, c;
	unsigned char data[16];
	for (c = 1; c; c += 1) {
		bytes = fread(data, sizeof(unsigned char), sizeof(data), fp);
		(void) printf("event %04d: 0x%02X %s %s %s (read: %d)\n",
				c,
				(unsigned int)(data[0] & 0xFF),
				(unsigned int)(data[0] & 0x01) ? "true" : "false",
				(unsigned int)(data[0] & 0x02) ? "true" : "false",
				(unsigned int)(data[0] & 0x04) ? "true" : "false",
				(int) bytes);
		for (a = 0; a < sizeof(data); a += 1) {
			(void) printf(" %02X", (unsigned int)(data[a] & 0xFF));
		}
		(void) puts("");
	}
}

static int
visit(const char *fpath, const struct stat *_stats, int _flags) {
	assert(!_stats);
	(void) fprintf(stderr, "%s\n", fpath);
	return _flags; // FTW_CONTINUE
}

static char *
walk(char *p) {
	char *argv[2], *q;
	FTSENT *e;
	FTS *f;
	size_t n;
	n = strnlen(p, PATH_MAX) + 1;
	q = calloc(n, ch_w);
	if (!q) return p;

	(void) strncpy(q, p, n);
	argv[0] = dirname(q);
	argv[1] = NULL;
	f = fts_open(argv, _FTS_OPTIONS, NULL);
	if (f == NULL) {
		//perror("fts_open");
		goto walk_done;
	}

	while ((e = fts_read(f)) != NULL) {
		if (e->fts_info & FTS_F) visit(e->fts_path, NULL, 0);
	}
	(void) fts_close(f);
walk_done:
	(void) free(q);
	return p;
}

int
main(void) {
	char *f;
	FILE *fp;
	f = "/dev/input/event1";
	f = walk(f);
	fp = fopen(f, "rb");
	if (!fp) {
		perror(f);
		return EXIT_FAILURE;
	}
	poll(fp);
	return EXIT_SUCCESS;
}
