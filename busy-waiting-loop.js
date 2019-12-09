// The most basic pattern for accessing this kind of non-blocking I/O is to 
// actively poll the resource within a loop until some actual data is returned;
// this is called busy-waiting.
// The following pseudo code shows you how it's possible to read from multiple
// resources using non-blocking I/O and a polling loop:

resources = [socketA, socketB, pipeA]; // depending on the number of resources
while (!resources.isEmpty()) {
    for (i = 0; i < resources.length; i++) {
        resource = resources[i];
        //try to read
        var data = resource.read();
        if (data === NO_DATA_AVAILABLE) {
            //there is no data to read at the moment continue;
        } else if (data === RESOURCE_CLOSED) {
            //the resource was closed, remove it from the list resources.remove(i);
        }
        else {
            //some data was received, process it consumeData(data);
        }
    }
}

// Analysis
// You can see that, with this simple technique, it is already possible to handle
// different resources in the same thread, but it's still not efficient.
// In fact, in the preceding example, the loop will consume precious CPU only
// for iterating over resources that are unavailable most of the time.
// Polling algorithms usually result in a huge amount of wasted CPU time.