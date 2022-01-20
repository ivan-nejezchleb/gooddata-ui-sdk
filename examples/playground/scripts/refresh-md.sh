#!/bin/bash

SCRIPTDIR=`dirname $0`
ROOTDIR="${SCRIPTDIR}/.."
EXPORTER="${ROOTDIR}/node_modules/.bin/gdc-catalog-export"
OUTPUT="${SCRIPTDIR}/full.ts"
PROJECTID="auiwj6pa2cs3twpjr98gtjfb34x3i0gv"

$EXPORTER \
  --hostname "https://staging3.intgdc.com" \
  --output "${OUTPUT}" \
  --project-id "${PROJECTID}" \
  --accept-untrusted-ssl
