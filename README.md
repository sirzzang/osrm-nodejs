# node-osrm

NodeJs routing server built with osrm-backend node wrapper


## Setup

1. download pbf data
    ```bash
    mkdir data
    cd data
    wget http://download.geofabrik.de/asia/south-korea-latest.osm.pbf
    ```

2. preprocess pbf data
    * MLD algorithm
        ```bash
        lib/binding/osrm-extract data/south-korea-latest.osm.pbf -p profiles/foot.lua
        lib/binding/osrm-partition data/south-korea-latest.osrm
        lib/binding/osrm-customize data/south-korea-latest.osrm
        ```
    * CH algorithm
        ```bash
        lib/binding/osrm-extract data/south-korea-latest.osm.pbf -p profiles/foot.lua
        lib/binding/osrm-contract data/south-korea-latest.osrm
        ```