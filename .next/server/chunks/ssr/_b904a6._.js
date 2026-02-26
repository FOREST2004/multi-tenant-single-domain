module.exports = {

"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/isEligibleRequest.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isEligibleRequest": ()=>isEligibleRequest
});
const ACCEPTABLE_CONTENT_TYPE = /multipart\/['"()+-_]+(?:; ?['"()+-_]*)+$/i;
const UNACCEPTABLE_METHODS = new Set([
    'GET',
    'HEAD',
    'DELETE',
    'OPTIONS',
    'CONNECT',
    'TRACE'
]);
const hasBody = (req)=>{
    return Boolean(req.headers.get('transfer-encoding') || req.headers.get('content-length') && req.headers.get('content-length') !== '0');
};
const hasAcceptableMethod = (req)=>!UNACCEPTABLE_METHODS.has(req.method);
const hasAcceptableContentType = (req)=>{
    const contType = req.headers.get('content-type');
    return contType.includes('boundary=') && ACCEPTABLE_CONTENT_TYPE.test(contType);
};
const isEligibleRequest = (req)=>{
    try {
        return hasBody(req) && hasAcceptableMethod(req) && hasAcceptableContentType(req);
    } catch (e) {
        return false;
    }
}; //# sourceMappingURL=isEligibleRequest.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/utilities.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "buildFields": ()=>buildFields,
    "checkAndMakeDir": ()=>checkAndMakeDir,
    "debugLog": ()=>debugLog,
    "deleteFile": ()=>deleteFile,
    "getTempFilename": ()=>getTempFilename,
    "isFunc": ()=>isFunc,
    "isSafeFromPollution": ()=>isSafeFromPollution,
    "moveFile": ()=>moveFile,
    "parseFileName": ()=>parseFileName,
    "parseFileNameExtension": ()=>parseFileNameExtension,
    "promiseCallback": ()=>promiseCallback,
    "saveBufferToFile": ()=>saveBufferToFile
});
var __TURBOPACK__commonjs__external__fs__ = __turbopack_external_require__("fs", true);
var __TURBOPACK__commonjs__external__path__ = __turbopack_external_require__("path", true);
var __TURBOPACK__commonjs__external__stream__ = __turbopack_external_require__("stream", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
// Parameters for safe file name parsing.
const SAFE_FILE_NAME_REGEX = /[^\w-]/g;
const MAX_EXTENSION_LENGTH = 3;
// Parameters to generate unique temporary file names:
const TEMP_COUNTER_MAX = 65536;
const TEMP_PREFIX = 'tmp';
let tempCounter = 0;
const debugLog = (options, msg)=>{
    const opts = options || {};
    if (!opts.debug) return false;
    console.log(`Next-file-upload: ${msg}`) // eslint-disable-line
    ;
    return true;
};
const getTempFilename = (prefix = TEMP_PREFIX)=>{
    tempCounter = tempCounter >= TEMP_COUNTER_MAX ? 1 : tempCounter + 1;
    return `${prefix}-${tempCounter}-${Date.now()}`;
};
const isFunc = (value)=>{
    return typeof value === 'function';
};
const errorFunc = (resolve, reject)=>isFunc(reject) ? reject : resolve;
const promiseCallback = (resolve, reject)=>{
    let hasFired = false;
    return (err)=>{
        if (hasFired) {
            return;
        }
        hasFired = true;
        return err ? errorFunc(resolve, reject)(err) : resolve();
    };
};
// The default prototypes for both objects and arrays.
// Used by isSafeFromPollution
const OBJECT_PROTOTYPE_KEYS = Object.getOwnPropertyNames(Object.prototype);
const ARRAY_PROTOTYPE_KEYS = Object.getOwnPropertyNames(Array.prototype);
const isSafeFromPollution = (base, key)=>{
    // We perform an instanceof check instead of Array.isArray as the former is more
    // permissive for cases in which the object as an Array prototype but was not constructed
    // via an Array constructor or literal.
    const TOUCHES_ARRAY_PROTOTYPE = base instanceof Array && ARRAY_PROTOTYPE_KEYS.includes(key);
    const TOUCHES_OBJECT_PROTOTYPE = OBJECT_PROTOTYPE_KEYS.includes(key);
    return !TOUCHES_ARRAY_PROTOTYPE && !TOUCHES_OBJECT_PROTOTYPE;
};
const buildFields = (instance, field, value)=>{
    // Do nothing if value is not set.
    if (value === null || value === undefined) return instance;
    instance = instance || Object.create(null);
    if (!isSafeFromPollution(instance, field)) {
        return instance;
    }
    // Non-array fields
    if (!instance[field]) {
        instance[field] = value;
        return instance;
    }
    // Array fields
    if (instance[field] instanceof Array) {
        instance[field].push(value);
    } else {
        instance[field] = [
            instance[field],
            value
        ];
    }
    return instance;
};
const checkAndMakeDir = (fileUploadOptions, filePath)=>{
    if (!fileUploadOptions.createParentPath) return false;
    // Check whether folder for the file exists.
    const parentPath = __TURBOPACK__commonjs__external__path__["default"].dirname(filePath);
    // Create folder if it doesn't exist.
    if (!__TURBOPACK__commonjs__external__fs__["default"].existsSync(parentPath)) __TURBOPACK__commonjs__external__fs__["default"].mkdirSync(parentPath, {
        recursive: true
    });
    // Checks folder again and return a results.
    return __TURBOPACK__commonjs__external__fs__["default"].existsSync(parentPath);
};
const deleteFile = (filePath, callback)=>__TURBOPACK__commonjs__external__fs__["default"].unlink(filePath, callback);
const copyFile = (src, dst, callback)=>{
    // cbCalled flag and runCb helps to run cb only once.
    let cbCalled = false;
    const runCb = (err)=>{
        if (cbCalled) return;
        cbCalled = true;
        callback(err);
    };
    // Create read stream
    const readable = __TURBOPACK__commonjs__external__fs__["default"].createReadStream(src);
    readable.on('error', runCb);
    // Create write stream
    const writable = __TURBOPACK__commonjs__external__fs__["default"].createWriteStream(dst);
    writable.on('error', (err)=>{
        readable.destroy();
        runCb(err);
    });
    writable.on('close', ()=>runCb());
    // Copy file via piping streams.
    readable.pipe(writable);
};
const moveFile = (src, dst, callback)=>__TURBOPACK__commonjs__external__fs__["default"].rename(src, dst, (err)=>{
        if (err) {
            // Try to copy file if rename didn't work.
            copyFile(src, dst, (cpErr)=>cpErr ? callback(cpErr) : deleteFile(src, callback));
            return;
        }
        // File was renamed successfully: Add true to the callback to indicate that.
        callback(null, true);
    });
const saveBufferToFile = (buffer, filePath, callback)=>{
    if (!Buffer.isBuffer(buffer)) {
        return callback(new Error('buffer variable should be type of Buffer!'));
    }
    // Setup readable stream from buffer.
    let streamData = buffer;
    const readStream = new __TURBOPACK__commonjs__external__stream__["Readable"]();
    readStream._read = ()=>{
        readStream.push(streamData);
        streamData = null;
    };
    // Setup file system writable stream.
    const fstream = __TURBOPACK__commonjs__external__fs__["default"].createWriteStream(filePath);
    // console.log("Calling saveBuffer");
    fstream.on('error', (err)=>{
        // console.log("err cb")
        callback(err);
    });
    fstream.on('close', ()=>{
        // console.log("close cb");
        callback();
    });
    // Copy file via piping streams.
    readStream.pipe(fstream);
};
/**
 * Decodes uriEncoded file names.
 * @param {Object} opts - middleware options.
 * @param fileName {String} - file name to decode.
 * @returns {String}
 */ const uriDecodeFileName = (opts, fileName)=>{
    if (!opts || !opts.uriDecodeFileNames) {
        return fileName;
    }
    // Decode file name from URI with checking URI malformed errors.
    // See Issue https://github.com/richardgirges/express-fileupload/issues/342.
    try {
        return decodeURIComponent(fileName);
    } catch (err) {
        const matcher = /(%[a-f\d]{2})/gi;
        return fileName.split(matcher).map((str)=>{
            try {
                return decodeURIComponent(str);
            } catch (err) {
                return '';
            }
        }).join('');
    }
};
const parseFileNameExtension = (preserveExtension, fileName)=>{
    const defaultResult = {
        name: fileName,
        extension: ''
    };
    if (!preserveExtension) return defaultResult;
    // Define maximum extension length
    const maxExtLength = typeof preserveExtension === 'boolean' ? MAX_EXTENSION_LENGTH : preserveExtension;
    const nameParts = fileName.split('.');
    if (nameParts.length < 2) return defaultResult;
    let extension = nameParts.pop();
    if (extension.length > maxExtLength && maxExtLength > 0) {
        nameParts[nameParts.length - 1] += '.' + extension.substr(0, extension.length - maxExtLength);
        extension = extension.substr(-maxExtLength);
    }
    return {
        name: nameParts.join('.'),
        extension: maxExtLength ? extension : ''
    };
};
const parseFileName = (opts, fileName)=>{
    // Check fileName argument
    if (!fileName || typeof fileName !== 'string') return getTempFilename();
    // Cut off file name if it's length more then 255.
    let parsedName = fileName.length <= 255 ? fileName : fileName.substr(0, 255);
    // Decode file name if uriDecodeFileNames option set true.
    parsedName = uriDecodeFileName(opts, parsedName);
    // Stop parsing file name if safeFileNames options hasn't been set.
    if (!opts.safeFileNames) return parsedName;
    // Set regular expression for the file name.
    const nameRegex = typeof opts.safeFileNames === 'object' && opts.safeFileNames instanceof RegExp ? opts.safeFileNames : SAFE_FILE_NAME_REGEX;
    // Parse file name extension.
    const parsedFileName = parseFileNameExtension(opts.preserveExtension, parsedName);
    if (parsedFileName.extension.length) parsedFileName.extension = '.' + parsedFileName.extension.replace(nameRegex, '');
    return parsedFileName.name.replace(nameRegex, '').concat(parsedFileName.extension);
}; //# sourceMappingURL=utilities.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/fileFactory.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "fileFactory": ()=>fileFactory
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/utilities.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
/**
 * Returns Local function that moves the file to a different location on the filesystem
 * which takes two function arguments to make it compatible w/ Promise or Callback APIs
 */ const moveFromTemp = (filePath, options, fileUploadOptions)=>(resolve, reject)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(fileUploadOptions, `Moving temporary file ${options.tempFilePath} to ${filePath}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["moveFile"])(options.tempFilePath, filePath, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["promiseCallback"])(resolve, reject));
    };
/**
 * Returns Local function that moves the file from buffer to a different location on the filesystem
 * which takes two function arguments to make it compatible w/ Promise or Callback APIs
 */ const moveFromBuffer = (filePath, options, fileUploadOptions)=>(resolve, reject)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(fileUploadOptions, `Moving uploaded buffer to ${filePath}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveBufferToFile"])(options.buffer, filePath, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["promiseCallback"])(resolve, reject));
    };
const fileFactory = (options, fileUploadOptions)=>{
    // see: https://github.com/richardgirges/express-fileupload/issues/14
    // firefox uploads empty file in case of cache miss when f5ing page.
    // resulting in unexpected behavior. if there is no file data, the file is invalid.
    // if (!fileUploadOptions.useTempFiles && !options.buffer.length) return;
    // Create and return file object.
    return {
        name: options.name,
        data: options.buffer,
        encoding: options.encoding,
        md5: options.hash,
        mimetype: options.mimetype,
        mv: (filePath, callback)=>{
            // Define a proper move function.
            const moveFunc = fileUploadOptions.useTempFiles ? moveFromTemp(filePath, options, fileUploadOptions) : moveFromBuffer(filePath, options, fileUploadOptions);
            // Create a folder for a file.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkAndMakeDir"])(fileUploadOptions, filePath);
            // If callback is passed in, use the callback API, otherwise return a promise.
            const defaultReject = ()=>undefined;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunc"])(callback) ? moveFunc(callback, defaultReject) : new Promise(moveFunc);
        },
        size: options.size,
        tempFilePath: options.tempFilePath,
        truncated: options.truncated
    };
}; //# sourceMappingURL=fileFactory.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/handlers.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "memHandler": ()=>memHandler,
    "tempFileHandler": ()=>tempFileHandler
});
var __TURBOPACK__commonjs__external__crypto__ = __turbopack_external_require__("crypto", true);
var __TURBOPACK__commonjs__external__fs__ = __turbopack_external_require__("fs", true);
var __TURBOPACK__commonjs__external__path__ = __turbopack_external_require__("path", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/utilities.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const tempFileHandler = (options, fieldname, filename)=>{
    const dir = __TURBOPACK__commonjs__external__path__["default"].normalize(options.tempFileDir);
    const tempFilePath = __TURBOPACK__commonjs__external__path__["default"].join(process.cwd(), dir, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTempFilename"])());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkAndMakeDir"])({
        createParentPath: true
    }, tempFilePath);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Temporary file path is ${tempFilePath}`);
    const hash = __TURBOPACK__commonjs__external__crypto__["default"].createHash('md5');
    let fileSize = 0;
    let completed = false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Opening write stream for ${fieldname}->${filename}...`);
    const writeStream = __TURBOPACK__commonjs__external__fs__["default"].createWriteStream(tempFilePath);
    const writePromise = new Promise((resolve, reject)=>{
        writeStream.on('finish', ()=>resolve(true));
        writeStream.on('error', (err)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Error write temp file: ${err}`);
            reject(err);
        });
    });
    return {
        cleanup: ()=>{
            completed = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Cleaning up temporary file ${tempFilePath}...`);
            writeStream.end();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteFile"])(tempFilePath, (err)=>err ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Cleaning up temporary file ${tempFilePath} failed: ${err}`) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Cleaning up temporary file ${tempFilePath} done.`));
        },
        complete: ()=>{
            completed = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Upload ${fieldname}->${filename} completed, bytes:${fileSize}.`);
            if (writeStream instanceof __TURBOPACK__commonjs__external__fs__["WriteStream"]) writeStream.end();
            // Return empty buff since data was uploaded into a temp file.
            return Buffer.concat([]);
        },
        dataHandler: (data)=>{
            if (completed === true) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Error: got ${fieldname}->${filename} data chunk for completed upload!`);
                return;
            }
            writeStream.write(data);
            hash.update(data);
            fileSize += data.length;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Uploading ${fieldname}->${filename}, bytes:${fileSize}...`);
        },
        getFilePath: ()=>tempFilePath,
        getFileSize: ()=>fileSize,
        getHash: ()=>hash.digest('hex'),
        getWritePromise: ()=>writePromise
    };
};
const memHandler = (options, fieldname, filename)=>{
    const buffers = [];
    const hash = __TURBOPACK__commonjs__external__crypto__["default"].createHash('md5');
    let fileSize = 0;
    let completed = false;
    const getBuffer = ()=>Buffer.concat(buffers, fileSize);
    return {
        cleanup: ()=>{
            completed = true;
        },
        complete: ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Upload ${fieldname}->${filename} completed, bytes:${fileSize}.`);
            completed = true;
            return getBuffer();
        },
        dataHandler: (data)=>{
            if (completed === true) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Error: got ${fieldname}->${filename} data chunk for completed upload!`);
                return;
            }
            buffers.push(data);
            hash.update(data);
            fileSize += data.length;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Uploading ${fieldname}->${filename}, bytes:${fileSize}...`);
        },
        getFilePath: ()=>'',
        getFileSize: ()=>fileSize,
        getHash: ()=>hash.digest('hex'),
        getWritePromise: ()=>Promise.resolve(true)
    };
}; //# sourceMappingURL=handlers.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/processNested.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "processNested": ()=>processNested
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/utilities.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const processNested = function(data) {
    if (!data || data.length < 1) return Object.create(null);
    const d = Object.create(null), keys = Object.keys(data);
    for(let i = 0; i < keys.length; i++){
        const key = keys[i], value = data[key], keyParts = key.replace(new RegExp(/\[/g), '.').replace(new RegExp(/\]/g), '').split('.');
        let current = d;
        for(let index = 0; index < keyParts.length; index++){
            const k = keyParts[index];
            // Ensure we don't allow prototype pollution
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSafeFromPollution"])(current, k)) {
                continue;
            }
            if (index >= keyParts.length - 1) {
                current[k] = value;
            } else {
                if (!current[k]) current[k] = !keyParts[index + 1] ? [] : Object.create(null);
                current = current[k];
            }
        }
    }
    return d;
}; //# sourceMappingURL=processNested.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/uploadTimer.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "createUploadTimer": ()=>createUploadTimer
});
const createUploadTimer = (timeout = 0, callback = ()=>{})=>{
    let timer = null;
    const clear = ()=>{
        clearTimeout(timer);
    };
    const set = ()=>{
        // Do not start a timer if zero timeout or it hasn't been set.
        if (!timeout) return false;
        clear();
        timer = setTimeout(callback, timeout);
        return true;
    };
    return {
        clear,
        set
    };
}; //# sourceMappingURL=uploadTimer.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/processMultipart.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "processMultipart": ()=>processMultipart
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$busboy$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/busboy/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$http$2d$status$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/http-status/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/errors/APIError.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$fileFactory$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/fileFactory.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$handlers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/handlers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$processNested$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/processNested.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$uploadTimer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/uploadTimer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/utilities.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
const waitFlushProperty = Symbol('wait flush property symbol');
const processMultipart = async ({ options, request })=>{
    let parsingRequest = true;
    let fileCount = 0;
    let filesCompleted = 0;
    let allFilesHaveResolved;
    let failedResolvingFiles;
    const allFilesComplete = new Promise((res, rej)=>{
        allFilesHaveResolved = res;
        failedResolvingFiles = rej;
    });
    const result = {
        fields: undefined,
        files: undefined
    };
    const headersObject = {};
    request.headers.forEach((value, name)=>{
        headersObject[name] = value;
    });
    function abortAndDestroyFile(file, err) {
        file.destroy();
        parsingRequest = false;
        failedResolvingFiles(err);
    }
    const busboy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$busboy$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
        ...options,
        headers: headersObject
    });
    // Build multipart req.body fields
    busboy.on('field', (field, val)=>{
        result.fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildFields"])(result.fields, field, val);
    });
    // Build req.files fields
    busboy.on('file', (field, file, info)=>{
        fileCount += 1;
        // Parse file name(cutting huge names, decoding, etc..).
        const { encoding, filename: name, mimeType: mime } = info;
        const filename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseFileName"])(options, name);
        // Define methods and handlers for upload process.
        const { cleanup, complete, dataHandler, getFilePath, getFileSize, getHash, getWritePromise } = options.useTempFiles ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$handlers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tempFileHandler"])(options, field, filename) // Upload into temporary file.
         : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$handlers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["memHandler"])(options, field, filename) // Upload into RAM.
        ;
        const writePromise = options.useTempFiles ? getWritePromise().catch((err)=>{
            busboy.end();
            cleanup();
        }) : getWritePromise();
        const uploadTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$uploadTimer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createUploadTimer"])(options.uploadTimeout, ()=>{
            return abortAndDestroyFile(file, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](`Upload timeout for ${field}->${filename}, bytes:${getFileSize()}`));
        });
        file.on('limit', ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Size limit reached for ${field}->${filename}, bytes:${getFileSize()}`);
            uploadTimer.clear();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunc"])(options.limitHandler)) {
                options.limitHandler({
                    request,
                    size: getFileSize()
                });
            }
            // Return error and cleanup files if abortOnLimit set.
            if (options.abortOnLimit) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Upload file size limit reached ${field}->${filename}.`);
                cleanup();
                abortAndDestroyFile(file, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](options.responseOnLimit, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$http$2d$status$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].REQUEST_ENTITY_TOO_LARGE, {
                    size: getFileSize()
                }));
            }
        });
        file.on('data', (data)=>{
            uploadTimer.set();
            dataHandler(data);
        });
        file.on('end', ()=>{
            const size = getFileSize();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Upload finished ${field}->${filename}, bytes:${size}`);
            uploadTimer.clear();
            if (!name && size === 0) {
                fileCount -= 1;
                if (options.useTempFiles) {
                    cleanup();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Removing the empty file ${field}->${filename}`);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Don't add file instance if original name and size are empty`);
            }
            filesCompleted += 1;
            result.files = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildFields"])(result.files, field, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$fileFactory$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fileFactory"])({
                name: filename,
                buffer: complete(),
                encoding,
                hash: getHash(),
                mimetype: mime,
                size,
                tempFilePath: getFilePath(),
                truncated: Boolean('truncated' in file && file.truncated)
            }, options));
            if (!request[waitFlushProperty]) {
                request[waitFlushProperty] = [];
            }
            request[waitFlushProperty].push(writePromise);
            if (filesCompleted === fileCount) {
                allFilesHaveResolved();
            }
        });
        file.on('error', (err)=>{
            uploadTimer.clear();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `File Error: ${err.message}`);
            cleanup();
            failedResolvingFiles(err);
        });
        // Start upload process.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `New upload started ${field}->${filename}, bytes:${getFileSize()}`);
        uploadTimer.set();
    });
    busboy.on('finish', async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Busboy finished parsing request.`);
        if (options.parseNested) {
            result.fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$processNested$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processNested"])(result.fields);
            result.files = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$processNested$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processNested"])(result.files);
        }
        if (request[waitFlushProperty]) {
            try {
                await Promise.all(request[waitFlushProperty]).then(()=>{
                    delete request[waitFlushProperty];
                });
            } catch (err) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Error waiting for file write promises: ${err}`);
            }
        }
        return result;
    });
    busboy.on('error', (err = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"]('Busboy error parsing multipart request', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$http$2d$status$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].BAD_REQUEST))=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(options, `Busboy error`);
        parsingRequest = false;
        throw err;
    });
    const reader = request.body.getReader();
    // Start parsing request
    while(parsingRequest){
        const { done, value } = await reader.read();
        if (done) {
            parsingRequest = false;
        }
        if (value) {
            busboy.write(value);
        }
    }
    if (fileCount !== 0) {
        await allFilesComplete.catch((e)=>{
            throw e;
        });
    }
    return result;
}; //# sourceMappingURL=processMultipart.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "fetchAPIFileUpload": ()=>fetchAPIFileUpload
});
var __TURBOPACK__commonjs__external__path__ = __turbopack_external_require__("path", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/errors/APIError.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$isEligibleRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/isEligibleRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$processMultipart$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/processMultipart.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/utilities.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const DEFAULT_OPTIONS = {
    abortOnLimit: false,
    createParentPath: false,
    debug: false,
    fileHandler: false,
    limitHandler: false,
    parseNested: false,
    preserveExtension: false,
    responseOnLimit: 'File size limit has been reached',
    safeFileNames: false,
    tempFileDir: __TURBOPACK__commonjs__external__path__["default"].join(process.cwd(), 'tmp'),
    uploadTimeout: 60000,
    uriDecodeFileNames: false,
    useTempFiles: false
};
const fetchAPIFileUpload = async ({ options, request })=>{
    const uploadOptions = {
        ...DEFAULT_OPTIONS,
        ...options
    };
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$isEligibleRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEligibleRequest"])(request)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["debugLog"])(uploadOptions, 'Request is not eligible for file upload!');
        return {
            error: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"]('Request is not eligible for file upload', 500),
            fields: undefined,
            files: undefined
        };
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$processMultipart$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processMultipart"])({
            options: uploadOptions,
            request
        });
    }
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/addDataAndFileToRequest.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addDataAndFileToRequest": ()=>addDataAndFileToRequest
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/errors/APIError.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/fetchAPI-multipart/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const addDataAndFileToRequest = async (req)=>{
    const { body, headers, method, payload } = req;
    if (method && [
        'PATCH',
        'POST',
        'PUT'
    ].includes(method.toUpperCase()) && body) {
        const [contentType] = (headers.get('Content-Type') || '').split(';');
        const bodyByteSize = parseInt(req.headers.get('Content-Length') || '0', 10);
        if (contentType === 'application/json') {
            let data = {};
            try {
                data = await req.json();
            } catch (error) {
                req.payload.logger.error(error);
            } finally{
                req.data = data;
                req.json = ()=>Promise.resolve(data);
            }
        } else if (bodyByteSize && contentType.includes('multipart/')) {
            const { error, fields, files } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$fetchAPI$2d$multipart$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAPIFileUpload"])({
                options: payload.config.upload,
                request: req
            });
            if (error) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](error.message);
            }
            if (files?.file) {
                req.file = files.file;
            }
            if (fields?._payload && typeof fields._payload === 'string') {
                req.data = JSON.parse(fields._payload);
            }
        }
    }
}; //# sourceMappingURL=addDataAndFileToRequest.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/addLocalesToRequest.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Mutates the Request to contain 'locale' and 'fallbackLocale' based on data or searchParams
 */ __turbopack_esm__({
    "addLocalesToRequestFromData": ()=>addLocalesToRequestFromData,
    "sanitizeLocales": ()=>sanitizeLocales
});
function addLocalesToRequestFromData(req) {
    const { data, payload: { config } } = req;
    if (data) {
        let localeOnReq = req.locale;
        let fallbackLocaleOnReq = req.fallbackLocale;
        if (!localeOnReq && data?.locale && typeof data.locale === 'string') {
            localeOnReq = data.locale;
        }
        if (!fallbackLocaleOnReq && data?.['fallback-locale'] && typeof data?.['fallback-locale'] === 'string') {
            fallbackLocaleOnReq = data['fallback-locale'];
        }
        const { fallbackLocale, locale } = sanitizeLocales({
            fallbackLocale: fallbackLocaleOnReq,
            locale: localeOnReq,
            localization: config.localization
        });
        if (locale) req.locale = locale;
        if (fallbackLocale) req.fallbackLocale = fallbackLocale;
    }
}
const sanitizeLocales = ({ fallbackLocale, locale, localization })=>{
    if ([
        'none',
        'null'
    ].includes(fallbackLocale)) {
        fallbackLocale = 'null';
    } else if (localization && !localization.localeCodes.includes(fallbackLocale)) {
        fallbackLocale = localization.defaultLocale;
    }
    if (locale === '*') {
        locale = 'all';
    } else if (localization && !localization.localeCodes.includes(locale)) {
        locale = localization.defaultLocale;
    }
    return {
        fallbackLocale,
        locale
    };
}; //# sourceMappingURL=addLocalesToRequest.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/getPayloadHMR.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getPayloadHMR": ()=>getPayloadHMR,
    "reload": ()=>reload
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/payload/dist/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ws$2f$wrapper$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/ws/wrapper.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ws$2f$wrapper$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/ws/wrapper.mjs [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
let cached = global._payload;
if (!cached) {
    // eslint-disable-next-line no-multi-assign
    cached = global._payload = {
        payload: null,
        promise: null,
        reload: false
    };
}
const reload = async (config, payload)=>{
    if (typeof payload.db.destroy === 'function') {
        await payload.db.destroy();
    }
    payload.config = config;
    payload.collections = config.collections.reduce((collections, collection)=>{
        collections[collection.slug] = {
            config: collection,
            customIDType: payload.collections[collection.slug]?.customIDType
        };
        return collections;
    }, {});
    payload.globals = {
        config: config.globals
    };
    // TODO: support HMR for other props in the future (see payload/src/index init()) hat may change on Payload singleton
    // Generate types
    if (config.typescript.autoGenerate !== false) {
        // We cannot run it directly here, as generate-types imports json-schema-to-typescript, which breaks on turbopack.
        // see: https://github.com/vercel/next.js/issues/66723
        void payload.bin({
            args: [
                'generate:types'
            ],
            log: false
        });
    }
    await payload.db.init();
    if (payload.db.connect) {
        await payload.db.connect({
            hotReload: true
        });
    }
};
const getPayloadHMR = async (options)=>{
    if (!options?.config) {
        throw new Error('Error: the payload config is required for getPayload to work.');
    }
    if (cached.payload) {
        const config = await options.config // TODO: check if we can move this inside the cached.reload === true condition
        ;
        if (cached.reload === true) {
            let resolve;
            cached.reload = new Promise((res)=>resolve = res);
            await reload(config, cached.payload);
            resolve();
        }
        if (cached.reload instanceof Promise) {
            await cached.reload;
        }
        return cached.payload;
    }
    if (!cached.promise) {
        cached.promise = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BasePayload"]().init(options);
    }
    try {
        cached.payload = await cached.promise;
        if (("TURBOPACK compile-time value", "development") !== 'production' && ("TURBOPACK compile-time value", "development") !== 'test' && process.env.DISABLE_PAYLOAD_HMR !== 'true') {
            try {
                const port = process.env.PORT || '3000';
                const ws = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ws$2f$wrapper$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](`ws://localhost:${port}${process.env.NEXT_BASE_PATH ?? ''}/_next/webpack-hmr`);
                ws.onmessage = (event)=>{
                    if (typeof event.data === 'string') {
                        const data = JSON.parse(event.data);
                        if ('action' in data && data.action === 'serverComponentChanges') {
                            cached.reload = true;
                        }
                    }
                };
            } catch (_) {
            // swallow e
            }
        }
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.payload;
}; //# sourceMappingURL=getPayloadHMR.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/getRequestLanguage.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getRequestLanguage": ()=>getRequestLanguage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$languages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/languages.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const getRequestLanguage = ({ config, cookies, headers })=>{
    const supportedLanguageKeys = Object.keys(config.i18n.supportedLanguages);
    const langCookie = cookies.get(`${config.cookiePrefix || 'payload'}-lng`);
    const languageFromCookie = typeof langCookie === 'string' ? langCookie : langCookie?.value;
    if (languageFromCookie && supportedLanguageKeys.includes(languageFromCookie)) {
        return languageFromCookie;
    }
    const languageFromHeader = headers.get('Accept-Language') ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$languages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractHeaderLanguage"])(headers.get('Accept-Language')) : undefined;
    if (languageFromHeader && supportedLanguageKeys.includes(languageFromHeader)) {
        return languageFromHeader;
    }
    return config.i18n.fallbackLanguage;
}; //# sourceMappingURL=getRequestLanguage.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/createPayloadRequest.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "createPayloadRequest": ()=>createPayloadRequest
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/init.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$executeAuthStrategies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/auth/executeAuthStrategies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$collections$2f$dataloader$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/collections/dataloader.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/auth/cookies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/node_modules/qs/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__commonjs__external__url__ = __turbopack_external_require__("url", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$addLocalesToRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/addLocalesToRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getPayloadHMR$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getPayloadHMR.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getRequestLanguage.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const createPayloadRequest = async ({ config: configPromise, params, request })=>{
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCookies"])(request.headers);
    const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getPayloadHMR$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPayloadHMR"])({
        config: configPromise
    });
    const { config } = payload;
    const urlProperties = new __TURBOPACK__commonjs__external__url__["URL"](request.url);
    const { pathname, searchParams } = urlProperties;
    const isGraphQL = !config.graphQL.disable && pathname === `${config.routes.api}${config.routes.graphQL}`;
    const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestLanguage"])({
        config,
        cookies,
        headers: request.headers
    });
    const i18n = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initI18n"])({
        config: config.i18n,
        context: 'api',
        language
    });
    let locale;
    let fallbackLocale;
    if (config.localization) {
        const locales = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$addLocalesToRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanitizeLocales"])({
            fallbackLocale: searchParams.get('fallback-locale'),
            locale: searchParams.get('locale'),
            localization: payload.config.localization
        });
        locale = locales.locale;
        fallbackLocale = locales.fallbackLocale;
    }
    const overrideHttpMethod = request.headers.get('X-HTTP-Method-Override');
    const queryToParse = overrideHttpMethod === 'GET' ? await request.text() : urlProperties.search;
    const query = queryToParse ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].parse(queryToParse, {
        arrayLimit: 1000,
        depth: 10,
        ignoreQueryPrefix: true
    }) : {};
    const customRequest = {
        context: {},
        fallbackLocale,
        hash: urlProperties.hash,
        host: urlProperties.host,
        href: urlProperties.href,
        i18n,
        locale,
        origin: urlProperties.origin,
        pathname: urlProperties.pathname,
        payload,
        payloadAPI: isGraphQL ? 'GraphQL' : 'REST',
        payloadDataLoader: undefined,
        payloadUploadSizes: {},
        port: urlProperties.port,
        protocol: urlProperties.protocol,
        query,
        routeParams: params || {},
        search: urlProperties.search,
        searchParams: urlProperties.searchParams,
        t: i18n.t,
        transactionID: undefined,
        user: null
    };
    const req = Object.assign(request, customRequest);
    req.payloadDataLoader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$collections$2f$dataloader$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDataLoader"])(req);
    const { responseHeaders, user } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$executeAuthStrategies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeAuthStrategies"])({
        headers: req.headers,
        isGraphQL,
        payload
    });
    req.user = user;
    if (responseHeaders) req.responseHeaders = responseHeaders;
    return req;
}; //# sourceMappingURL=createPayloadRequest.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/getNextRequestI18n.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getNextRequestI18n": ()=>getNextRequestI18n
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/init.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getRequestLanguage.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const getNextRequestI18n = async ({ config })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initI18n"])({
        config: config.i18n,
        context: 'client',
        language: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestLanguage"])({
            config,
            cookies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])(),
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()
        })
    }); //# sourceMappingURL=getNextRequestI18n.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/headersWithCors.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "headersWithCors": ()=>headersWithCors
});
const headersWithCors = ({ headers, req })=>{
    const cors = req?.payload.config.cors;
    const requestOrigin = req?.headers.get('Origin');
    if (cors) {
        headers.set('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Encoding, x-apollo-tracing');
        if (cors === '*') {
            headers.set('Access-Control-Allow-Origin', '*');
        } else if (Array.isArray(cors) && cors.indexOf(requestOrigin) > -1) {
            headers.set('Access-Control-Allow-Credentials', 'true');
            headers.set('Access-Control-Allow-Origin', requestOrigin);
        }
    }
    return headers;
}; //# sourceMappingURL=headersWithCors.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/exports/utilities.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
;
;
;
;
;
 //# sourceMappingURL=utilities.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/exports/utilities.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$addDataAndFileToRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/addDataAndFileToRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$addLocalesToRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/addLocalesToRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$createPayloadRequest$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/createPayloadRequest.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getNextRequestI18n$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getNextRequestI18n.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getPayloadHMR$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getPayloadHMR.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$headersWithCors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/headersWithCors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$exports$2f$utilities$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/exports/utilities.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/getRequestTheme.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getRequestTheme": ()=>getRequestTheme
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const acceptedThemes = [
    'dark',
    'light'
];
const getRequestTheme = ({ config, cookies, headers })=>{
    const themeCookie = cookies.get(`${config.cookiePrefix || 'payload'}-theme`);
    const themeFromCookie = typeof themeCookie === 'string' ? themeCookie : themeCookie?.value;
    if (themeFromCookie && acceptedThemes.includes(themeFromCookie)) {
        return themeFromCookie;
    }
    const themeFromHeader = headers.get('Sec-CH-Prefers-Color-Scheme');
    if (themeFromHeader && acceptedThemes.includes(themeFromHeader)) {
        return themeFromHeader;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultTheme"];
}; //# sourceMappingURL=getRequestTheme.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DefaultEditView": ()=>DefaultEditView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const DefaultEditView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DefaultEditView() from the server but DefaultEditView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/index.js", "DefaultEditView");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DefaultListView": ()=>DefaultListView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const DefaultListView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DefaultListView() from the server but DefaultListView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js", "DefaultListView");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/layouts/Root/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/* __next_internal_action_entry_do_not_use__ {"f6b807fa88381a4ed7facc141bf226eb093db646":"$$ACTION_0"} */ __turbopack_esm__({
    "$$ACTION_0": ()=>$$ACTION_0,
    "RootLayout": ()=>RootLayout,
    "metadata": ()=>metadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_641e8bd4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/font/google/merriweather_641e8bd4.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/init.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$languages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/languages.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$providers$2f$ComponentMap$2f$buildComponentMap$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/providers/ComponentMap/buildComponentMap/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$config$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/config/client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/auth/cookies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getPayloadHMR$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getPayloadHMR.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getRequestLanguage.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestTheme$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getRequestTheme.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const metadata = {
    description: 'Generated by Next.js',
    title: 'Next.js'
};
const RootLayout = async ({ children, config: configPromise })=>{
    const config = await configPromise;
    const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCookies"])(headers);
    const languageCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestLanguage"])({
        config,
        cookies,
        headers
    });
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestTheme$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestTheme"])({
        config,
        cookies,
        headers
    });
    const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getPayloadHMR$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPayloadHMR"])({
        config
    });
    const i18n = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initI18n"])({
        config: config.i18n,
        context: 'client',
        language: languageCode
    });
    const clientConfig = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$config$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClientConfig"])({
        config,
        t: i18n.t
    });
    const dir = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$languages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rtlLanguages"].includes(languageCode) ? 'RTL' : 'LTR';
    const languageOptions = Object.entries(config.i18n.supportedLanguages || {}).reduce((acc, [language, languageConfig])=>{
        if (Object.keys(config.i18n.supportedLanguages).includes(language)) {
            acc.push({
                label: languageConfig.translations.general.thisLanguage,
                value: language
            });
        }
        return acc;
    }, []);
    var switchLanguageServerAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])("f6b807fa88381a4ed7facc141bf226eb093db646", $$ACTION_0).bind(null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encryptActionBoundArgs"])("f6b807fa88381a4ed7facc141bf226eb093db646", [
        config.cookiePrefix
    ]));
    const { componentMap, wrappedChildren } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$providers$2f$ComponentMap$2f$buildComponentMap$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildComponentMap"])({
        DefaultEditView: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultEditView"],
        DefaultListView: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultListView"],
        children,
        i18n,
        payload
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("html", {
        className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_641e8bd4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable,
        "data-theme": theme,
        dir: dir,
        lang: languageCode,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("body", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RootProvider"], {
                    componentMap: componentMap,
                    config: clientConfig,
                    dateFNSKey: i18n.dateFNSKey,
                    fallbackLang: clientConfig.i18n.fallbackLanguage,
                    languageCode: languageCode,
                    languageOptions: languageOptions,
                    // eslint-disable-next-line react/jsx-no-bind
                    switchLanguageServerAction: switchLanguageServerAction,
                    theme: theme,
                    translations: i18n.translations,
                    children: wrappedChildren
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    id: "portal"
                })
            ]
        })
    });
}; //# sourceMappingURL=index.js.map
// eslint-disable-next-line @typescript-eslint/require-await
async function $$ACTION_0($$ACTION_CLOSURE_BOUND, lang) {
    var [$$ACTION_ARG_0] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decryptActionBoundArgs"])("f6b807fa88381a4ed7facc141bf226eb093db646", $$ACTION_CLOSURE_BOUND);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])().set({
        name: `${$$ACTION_ARG_0 || 'payload'}-lng`,
        path: '/',
        value: lang
    });
}

})()),
"[project]/node_modules/@payloadcms/next/dist/exports/layouts.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
 //# sourceMappingURL=layouts.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/exports/layouts.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$layouts$2f$Root$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/layouts/Root/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$exports$2f$layouts$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/exports/layouts.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavHamburger/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NavHamburger": ()=>NavHamburger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const NavHamburger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NavHamburger() from the server but NavHamburger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavHamburger/index.js", "NavHamburger");

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavHamburger/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavHamburger$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavHamburger/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavHamburger$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavWrapper/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NavWrapper": ()=>NavWrapper
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const NavWrapper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NavWrapper() from the server but NavWrapper is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavWrapper/index.js", "NavWrapper");

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavWrapper/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavWrapper$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavWrapper/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavWrapper$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Nav/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DefaultNavClient": ()=>DefaultNavClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const DefaultNavClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DefaultNavClient() from the server but DefaultNavClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/elements/Nav/index.client.js", "DefaultNavClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Nav/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Nav/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Nav/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DefaultNav": ()=>DefaultNav
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavHamburger$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavHamburger/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavWrapper$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Nav/NavWrapper/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Nav/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const baseClass = 'nav';
;
;
const DefaultNav = (props)=>{
    const { i18n, locale, params, payload, permissions, searchParams, user } = props;
    if (!payload?.config) {
        return null;
    }
    const { admin: { components: { afterNavLinks, beforeNavLinks } } } = payload.config;
    const BeforeNavLinks = Array.isArray(beforeNavLinks) ? beforeNavLinks.map((Component, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithServerSideProps"], {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    const AfterNavLinks = Array.isArray(afterNavLinks) ? afterNavLinks.map((Component, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithServerSideProps"], {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavWrapper$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NavWrapper"], {
        baseClass: baseClass,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("nav", {
                className: `${baseClass}__wrap`,
                children: [
                    Array.isArray(BeforeNavLinks) && BeforeNavLinks.map((Component)=>Component),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultNavClient"], {}),
                    Array.isArray(AfterNavLinks) && AfterNavLinks.map((Component)=>Component),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: `${baseClass}__controls`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Logout"], {})
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: `${baseClass}__header`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: `${baseClass}__header-content`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$NavHamburger$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NavHamburger"], {
                        baseClass: baseClass
                    })
                })
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/templates/Default/NavHamburger/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NavHamburger": ()=>NavHamburger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const NavHamburger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NavHamburger() from the server but NavHamburger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/templates/Default/NavHamburger/index.js", "NavHamburger");

})()),
"[project]/node_modules/@payloadcms/next/dist/templates/Default/NavHamburger/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$NavHamburger$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Default/NavHamburger/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$NavHamburger$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/templates/Default/Wrapper/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Wrapper": ()=>Wrapper
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const Wrapper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Wrapper() from the server but Wrapper is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/templates/Default/Wrapper/index.js", "Wrapper");

})()),
"[project]/node_modules/@payloadcms/next/dist/templates/Default/Wrapper/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$Wrapper$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Default/Wrapper/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$Wrapper$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/templates/Default/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DefaultTemplate": ()=>DefaultTemplate
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Nav/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$NavHamburger$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Default/NavHamburger/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$Wrapper$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Default/Wrapper/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const baseClass = 'template-default';
const DefaultTemplate = ({ children, className, i18n, locale, params, payload, permissions, searchParams, user, visibleEntities })=>{
    const { admin: { components: { Nav: CustomNav } = {
        Nav: undefined
    } } = {} } = payload.config || {};
    const navProps = {
        i18n,
        locale,
        params,
        payload,
        permissions,
        searchParams,
        user
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityVisibilityProvider"], {
        visibleEntities: visibleEntities,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: `${baseClass}__nav-toggler-wrapper`,
                    id: "nav-toggler",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NavToggler"], {
                        className: `${baseClass}__nav-toggler`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$NavHamburger$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NavHamburger"], {})
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$Wrapper$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Wrapper"], {
                    baseClass: baseClass,
                    className: className,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderCustomComponent"], {
                            CustomComponent: CustomNav,
                            DefaultComponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Nav$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultNav"],
                            componentProps: navProps,
                            serverOnlyProps: {
                                i18n,
                                locale,
                                params,
                                payload,
                                permissions,
                                searchParams,
                                user
                            }
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: `${baseClass}__wrap`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AppHeader"], {}),
                                children
                            ]
                        })
                    ]
                })
            ]
        })
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/initPage/shared.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isAdminAuthRoute": ()=>isAdminAuthRoute,
    "isAdminRoute": ()=>isAdminRoute
});
const authRouteKeys = [
    'createFirstUser',
    'forgot',
    'login',
    'logout',
    'forgot',
    'inactivity',
    'unauthorized',
    'reset'
];
const isAdminRoute = (route, adminRoute)=>{
    return route.startsWith(adminRoute);
};
const isAdminAuthRoute = (config, route, adminRoute)=>{
    const authRoutes = config.admin?.routes ? Object.entries(config.admin.routes).filter(([key])=>authRouteKeys.includes(key)).map(([_, value])=>value) : [];
    return authRoutes.some((r)=>route.replace(adminRoute, '').startsWith(r));
}; //# sourceMappingURL=shared.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/initPage/handleAdminPage.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "handleAdminPage": ()=>handleAdminPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$shared$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/initPage/shared.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const handleAdminPage = ({ adminRoute, config, permissions, route })=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$shared$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdminRoute"])(route, adminRoute)) {
        const routeSegments = route.replace(adminRoute, '').split('/').filter(Boolean);
        const [entityType, entitySlug, createOrID] = routeSegments;
        const collectionSlug = entityType === 'collections' ? entitySlug : undefined;
        const globalSlug = entityType === 'globals' ? entitySlug : undefined;
        const docID = collectionSlug && createOrID !== 'create' ? createOrID : undefined;
        let collectionConfig;
        let globalConfig;
        if (collectionSlug) {
            collectionConfig = config.collections.find((collection)=>collection.slug === collectionSlug);
            if (!collectionConfig) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
            }
        }
        if (globalSlug) {
            globalConfig = config.globals.find((global)=>global.slug === globalSlug);
            if (!globalConfig) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
            }
        }
        if (!permissions.canAccessAdmin && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$shared$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdminAuthRoute"])(config, route, adminRoute)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
        return {
            collectionConfig,
            docID,
            globalConfig
        };
    }
}; //# sourceMappingURL=handleAdminPage.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/initPage/handleAuthRedirect.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "handleAuthRedirect": ()=>handleAuthRedirect
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/node_modules/qs/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$shared$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/initPage/shared.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const handleAuthRedirect = ({ config, redirectUnauthenticatedUser, route, searchParams })=>{
    const { admin: { routes: { login: loginRouteFromConfig } }, routes: { admin: adminRoute } } = config;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$shared$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdminAuthRoute"])(config, route, adminRoute)) {
        if (searchParams && 'redirect' in searchParams) delete searchParams.redirect;
        const redirectRoute = encodeURIComponent(route + Object.keys(searchParams ?? {}).length ? `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].stringify(searchParams, {
            addQueryPrefix: true
        })}` : undefined);
        const adminLoginRoute = `${adminRoute}${loginRouteFromConfig}`;
        const customLoginRoute = typeof redirectUnauthenticatedUser === 'string' ? redirectUnauthenticatedUser : undefined;
        const loginRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$shared$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdminRoute"])(route, adminRoute) ? adminLoginRoute : customLoginRoute || loginRouteFromConfig;
        const parsedLoginRouteSearchParams = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].parse(loginRoute.split('?')[1] ?? '');
        const searchParamsWithRedirect = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].stringify({
            ...parsedLoginRouteSearchParams,
            ...redirectRoute ? {
                redirect: redirectRoute
            } : {}
        }, {
            addQueryPrefix: true
        })}`;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`${loginRoute.split('?')[0]}${searchParamsWithRedirect}`);
    }
}; //# sourceMappingURL=handleAuthRedirect.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/initPage/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "initPage": ()=>initPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/init.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$createLocalReq$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/createLocalReq.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isEntityHidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/isEntityHidden.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/auth/cookies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/node_modules/qs/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getPayloadHMR$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getPayloadHMR.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getRequestLanguage.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$handleAdminPage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/initPage/handleAdminPage.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$handleAuthRedirect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/initPage/handleAuthRedirect.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
const initPage = async ({ config: configPromise, redirectUnauthenticatedUser = false, route, searchParams })=>{
    const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getPayloadHMR$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPayloadHMR"])({
        config: configPromise
    });
    const { collections, globals, i18n: i18nConfig, localization, routes: { admin: adminRoute } } = payload.config;
    const queryString = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].stringify(searchParams ?? {}, {
        addQueryPrefix: true
    })}`;
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCookies"])(headers);
    const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getRequestLanguage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestLanguage"])({
        config: payload.config,
        cookies,
        headers
    });
    const i18n = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$init$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initI18n"])({
        config: i18nConfig,
        context: 'client',
        language
    });
    const languageOptions = Object.entries(payload.config.i18n.supportedLanguages || {}).reduce((acc, [language, languageConfig])=>{
        if (Object.keys(payload.config.i18n.supportedLanguages).includes(language)) {
            acc.push({
                label: languageConfig.translations.general.thisLanguage,
                value: language
            });
        }
        return acc;
    }, []);
    const req = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$createLocalReq$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLocalReq"])({
        fallbackLocale: null,
        req: {
            headers,
            host: headers.get('host'),
            i18n,
            query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].parse(queryString, {
                depth: 10,
                ignoreQueryPrefix: true
            }),
            url: `${payload.config.serverURL}${route}${searchParams ? queryString : ''}`
        }
    }, payload);
    const { permissions, user } = await payload.auth({
        headers,
        req
    });
    req.user = user;
    const localeParam = searchParams?.locale;
    let locale;
    if (localization) {
        const defaultLocaleCode = localization.defaultLocale ? localization.defaultLocale : 'en';
        let localeCode = localeParam;
        if (!localeCode) {
            try {
                localeCode = await payload.find({
                    collection: 'payload-preferences',
                    depth: 0,
                    limit: 1,
                    user,
                    where: {
                        and: [
                            {
                                'user.relationTo': {
                                    equals: payload.config.admin.user
                                }
                            },
                            {
                                'user.value': {
                                    equals: user.id
                                }
                            },
                            {
                                key: {
                                    equals: 'locale'
                                }
                            }
                        ]
                    }
                })?.then((res)=>res.docs?.[0]?.value);
            } catch (error) {} // eslint-disable-line no-empty
        }
        locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLocaleFromCode"])(localization, localeCode);
        if (!locale) locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLocaleFromCode"])(localization, defaultLocaleCode);
        req.locale = locale.code;
    }
    const visibleEntities = {
        collections: collections.map(({ slug, admin: { hidden } })=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isEntityHidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEntityHidden"])({
                hidden,
                user
            }) ? slug : null).filter(Boolean),
        globals: globals.map(({ slug, admin: { hidden } })=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isEntityHidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEntityHidden"])({
                hidden,
                user
            }) ? slug : null).filter(Boolean)
    };
    if (redirectUnauthenticatedUser && !user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$handleAuthRedirect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleAuthRedirect"])({
            config: payload.config,
            redirectUnauthenticatedUser,
            route,
            searchParams
        });
    }
    const { collectionConfig, docID, globalConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$handleAdminPage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleAdminPage"])({
        adminRoute,
        config: payload.config,
        permissions,
        route
    });
    return {
        collectionConfig,
        cookies,
        docID,
        globalConfig,
        languageOptions,
        locale,
        permissions,
        req,
        translations: i18n.translations,
        visibleEntities
    };
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NotFoundClient": ()=>NotFoundClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const NotFoundClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NotFoundClient() from the server but NotFoundClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.client.js", "NotFoundClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NotFoundPage": ()=>NotFoundPage,
    "NotFoundView": ()=>NotFoundView,
    "generatePageMetadata": ()=>generatePageMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Default/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getNextRequestI18n$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getNextRequestI18n.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/initPage/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const generatePageMetadata = async ({ config: configPromise })=>{
    const config = await configPromise;
    const i18n = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getNextRequestI18n$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNextRequestI18n"])({
        config
    });
    return {
        title: i18n.t('general:notFound')
    };
};
const NotFoundPage = async ({ config: configPromise, params, searchParams })=>{
    const config = await configPromise;
    const { routes: { admin: adminRoute } = {} } = config;
    const initPageResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initPage"])({
        config,
        redirectUnauthenticatedUser: true,
        route: `${adminRoute}/not-found`,
        searchParams
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HydrateClientUser"], {
                permissions: initPageResult.permissions,
                user: initPageResult.req.user
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultTemplate"], {
                i18n: initPageResult.req.i18n,
                locale: initPageResult.locale,
                params: params,
                payload: initPageResult.req.payload,
                permissions: initPageResult.permissions,
                searchParams: searchParams,
                user: initPageResult.req.user,
                visibleEntities: initPageResult.visibleEntities,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFoundClient"], {})
            })
        ]
    });
};
const NotFoundView = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFoundClient"], {
        marginTop: "large"
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/templates/Minimal/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "MinimalTemplate": ()=>MinimalTemplate
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const baseClass = 'template-minimal';
const MinimalTemplate = (props)=>{
    const { children, className, style = {}, width = 'normal' } = props;
    const classes = [
        className,
        baseClass,
        `${baseClass}--width-${width}`
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("section", {
        className: classes,
        style: style,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: `${baseClass}__wrap`,
            children: children
        })
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/ShouldRenderTabs.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ShouldRenderTabs": ()=>ShouldRenderTabs
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const ShouldRenderTabs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ShouldRenderTabs() from the server but ShouldRenderTabs is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/ShouldRenderTabs.js", "ShouldRenderTabs");

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/ShouldRenderTabs.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$ShouldRenderTabs$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/ShouldRenderTabs.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$ShouldRenderTabs$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/Tab/TabLink.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DocumentTabLink": ()=>DocumentTabLink
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const DocumentTabLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentTabLink() from the server but DocumentTabLink is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/Tab/TabLink.js", "DocumentTabLink");

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/Tab/TabLink.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$Tab$2f$TabLink$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/Tab/TabLink.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$Tab$2f$TabLink$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/Tab/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DocumentTab": ()=>DocumentTab,
    "baseClass": ()=>baseClass
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$Tab$2f$TabLink$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/Tab/TabLink.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const baseClass = 'doc-tab';
const DocumentTab = (props)=>{
    const { Pill, apiURL, collectionConfig, condition, config, globalConfig, href: tabHref, i18n, isActive: tabIsActive, label, newTab, permissions } = props;
    const { routes } = config;
    let href = typeof tabHref === 'string' ? tabHref : '';
    let isActive = typeof tabIsActive === 'boolean' ? tabIsActive : false;
    if (typeof tabHref === 'function') {
        href = tabHref({
            apiURL,
            collection: collectionConfig,
            global: globalConfig,
            routes
        });
    }
    if (typeof tabIsActive === 'function') {
        isActive = tabIsActive({
            href
        });
    }
    const meetsCondition = !condition || condition && Boolean(condition({
        collectionConfig,
        config,
        globalConfig,
        permissions
    }));
    if (meetsCondition) {
        const labelToRender = typeof label === 'function' ? label({
            t: i18n.t
        }) : label;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$Tab$2f$TabLink$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentTabLink"], {
            adminRoute: routes.admin,
            ariaLabel: labelToRender,
            baseClass: baseClass,
            href: href,
            isActive: isActive,
            isCollection: !!collectionConfig && !globalConfig,
            newTab: newTab,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                className: `${baseClass}__label`,
                children: [
                    labelToRender,
                    Pill && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Pill, {})
                        ]
                    })
                ]
            })
        });
    }
    return null;
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/VersionsPill/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "VersionsPill": ()=>VersionsPill
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const VersionsPill = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call VersionsPill() from the server but VersionsPill is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/VersionsPill/index.js", "VersionsPill");

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/VersionsPill/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$VersionsPill$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/VersionsPill/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$VersionsPill$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "documentViewKeys": ()=>documentViewKeys,
    "tabs": ()=>tabs
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$VersionsPill$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/VersionsPill/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const documentViewKeys = [
    'API',
    'Default',
    'LivePreview',
    'References',
    'Relationships',
    'Version',
    'Versions'
];
const tabs = {
    API: {
        condition: ({ collectionConfig, globalConfig })=>collectionConfig && !collectionConfig?.admin?.hideAPIURL || globalConfig && !globalConfig?.admin?.hideAPIURL,
        href: '/api',
        label: 'API',
        order: 1000
    },
    Default: {
        href: '',
        // isActive: ({ href, location }) =>
        // location.pathname === href || location.pathname === `${href}/create`,
        label: ({ t })=>t('general:edit'),
        order: 0
    },
    LivePreview: {
        condition: ({ collectionConfig, config, globalConfig })=>{
            if (collectionConfig) {
                return Boolean(config?.admin?.livePreview?.collections?.includes(collectionConfig.slug) || collectionConfig?.admin?.livePreview);
            }
            if (globalConfig) {
                return Boolean(config?.admin?.livePreview?.globals?.includes(globalConfig.slug) || globalConfig?.admin?.livePreview);
            }
            return false;
        },
        href: '/preview',
        label: ({ t })=>t('general:livePreview'),
        order: 100
    },
    References: {
        condition: ()=>false
    },
    Relationships: {
        condition: ()=>false
    },
    Version: {
        condition: ()=>false
    },
    Versions: {
        Pill: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$VersionsPill$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VersionsPill"],
        condition: ({ collectionConfig, globalConfig, permissions })=>Boolean(collectionConfig?.versions && permissions?.collections?.[collectionConfig?.slug]?.readVersions?.permission || globalConfig?.versions && permissions?.globals?.[globalConfig?.slug]?.readVersions?.permission),
        href: '/versions',
        label: ({ t })=>t('version:versions'),
        order: 200
    }
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/getCustomViews.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getCustomViews": ()=>getCustomViews
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const getCustomViews = (args)=>{
    const { collectionConfig, globalConfig } = args;
    let customViews;
    if (collectionConfig) {
        const collectionViewsConfig = typeof collectionConfig?.admin?.components?.views?.Edit === 'object' && typeof collectionConfig?.admin?.components?.views?.Edit !== 'function' ? collectionConfig?.admin?.components?.views?.Edit : undefined;
        customViews = Object.entries(collectionViewsConfig || {}).reduce((prev, [key, view])=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["documentViewKeys"].includes(key)) {
                return prev;
            }
            return [
                ...prev,
                {
                    ...view,
                    key
                }
            ];
        }, []);
    }
    if (globalConfig) {
        const globalViewsConfig = typeof globalConfig?.admin?.components?.views?.Edit === 'object' && typeof globalConfig?.admin?.components?.views?.Edit !== 'function' ? globalConfig?.admin?.components?.views?.Edit : undefined;
        customViews = Object.entries(globalViewsConfig || {}).reduce((prev, [key, view])=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["documentViewKeys"].includes(key)) {
                return prev;
            }
            return [
                ...prev,
                {
                    ...view,
                    key
                }
            ];
        }, []);
    }
    return customViews;
}; //# sourceMappingURL=getCustomViews.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/getViewConfig.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getViewConfig": ()=>getViewConfig
});
const getViewConfig = (args)=>{
    const { name, collectionConfig, globalConfig } = args;
    if (collectionConfig) {
        const collectionConfigViewsConfig = typeof collectionConfig?.admin?.components?.views?.Edit === 'object' && typeof collectionConfig?.admin?.components?.views?.Edit !== 'function' ? collectionConfig?.admin?.components?.views?.Edit : undefined;
        return collectionConfigViewsConfig?.[name];
    }
    if (globalConfig) {
        const globalConfigViewsConfig = typeof globalConfig?.admin?.components?.views?.Edit === 'object' && typeof globalConfig?.admin?.components?.views?.Edit !== 'function' ? globalConfig?.admin?.components?.views?.Edit : undefined;
        return globalConfigViewsConfig?.[name];
    }
    return null;
}; //# sourceMappingURL=getViewConfig.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DocumentTabs": ()=>DocumentTabs
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isPlainObject$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/isPlainObject.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$ShouldRenderTabs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/ShouldRenderTabs.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$Tab$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/Tab/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$getCustomViews$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/getCustomViews.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$getViewConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/getViewConfig.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/tabs/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
const baseClass = 'doc-tabs';
const DocumentTabs = (props)=>{
    const { collectionConfig, config, globalConfig, permissions } = props;
    const customViews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$getCustomViews$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViews"])({
        collectionConfig,
        globalConfig
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$ShouldRenderTabs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ShouldRenderTabs"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: baseClass,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: `${baseClass}__tabs-container`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("ul", {
                    className: `${baseClass}__tabs`,
                    children: [
                        Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$tabs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tabs"])?.sort(([, a], [, b])=>{
                            if (a.order === undefined && b.order === undefined) return 0;
                            else if (a.order === undefined) return 1;
                            else if (b.order === undefined) return -1;
                            return a.order - b.order;
                        })?.map(([name, tab], index)=>{
                            const viewConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$getViewConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getViewConfig"])({
                                name,
                                collectionConfig,
                                globalConfig
                            });
                            const tabFromConfig = viewConfig && 'Tab' in viewConfig ? viewConfig.Tab : undefined;
                            const tabConfig = typeof tabFromConfig === 'object' ? tabFromConfig : undefined;
                            const { condition } = tabConfig || {};
                            const meetsCondition = !condition || condition && Boolean(condition({
                                collectionConfig,
                                config,
                                globalConfig,
                                permissions
                            }));
                            if (meetsCondition) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$Tab$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentTab"], {
                                    ...props,
                                    ...tab || {},
                                    ...tabFromConfig || {}
                                }, `tab-${index}`);
                            }
                            return null;
                        }),
                        customViews?.map((CustomView, index)=>{
                            if ('Tab' in CustomView) {
                                const { Tab, path } = CustomView;
                                if (typeof Tab === 'object' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isPlainObject$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlainObject"])(Tab)) {
                                    throw new Error(`Custom 'Tab' Component for path: "${path}" must be a React Server Component. To use client-side functionality, render your Client Component within a Server Component and pass it only props that are serializable. More info: https://react.dev/reference/react/use-server#serializable-parameters-and-return-values`);
                                }
                                if (typeof Tab === 'function') {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(Tab, {
                                        path: path,
                                        ...props,
                                        key: `tab-custom-${index}`
                                    });
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$Tab$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentTab"], {
                                    ...props,
                                    ...Tab
                                }, `tab-custom-${index}`);
                            }
                            return null;
                        })
                    ]
                })
            })
        })
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DocumentHeader": ()=>DocumentHeader
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/Tabs/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const baseClass = `doc-header`;
const DocumentHeader = (props)=>{
    const { collectionConfig, config, customHeader, globalConfig, hideTabs, i18n, permissions } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Gutter"], {
        className: baseClass,
        children: [
            customHeader && customHeader,
            !customHeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderTitle"], {
                        className: `${baseClass}__title`
                    }),
                    !hideTabs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$Tabs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentTabs"], {
                        collectionConfig: collectionConfig,
                        config: config,
                        globalConfig: globalConfig,
                        i18n: i18n,
                        permissions: permissions
                    })
                ]
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentData.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getDocumentData": ()=>getDocumentData
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$utilities$2f$buildFormState$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/utilities/buildFormState.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const getDocumentData = async (args)=>{
    const { id, collectionConfig, globalConfig, locale, req } = args;
    try {
        const formState = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$utilities$2f$buildFormState$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildFormState"])({
            req: {
                ...req,
                data: {
                    id,
                    collectionSlug: collectionConfig?.slug,
                    globalSlug: globalConfig?.slug,
                    locale: locale?.code,
                    operation: collectionConfig && id || globalConfig ? 'update' : 'create',
                    schemaPath: collectionConfig?.slug || globalConfig?.slug
                }
            }
        });
        const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reduceFieldsToValues"])(formState, true);
        return {
            data,
            formState
        };
    } catch (error) {
        console.error('Error getting document data', error) // eslint-disable-line no-console
        ;
        return {};
    }
}; //# sourceMappingURL=getDocumentData.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentPermissions.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getDocumentPermissions": ()=>getDocumentPermissions
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$collections$2f$operations$2f$docAccess$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/collections/operations/docAccess.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$globals$2f$operations$2f$docAccess$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__docAccessOperation__as__docAccessOperationGlobal$3e$__ = __turbopack_import__("[project]/node_modules/payload/dist/globals/operations/docAccess.js [app-rsc] (ecmascript) <export docAccessOperation as docAccessOperationGlobal>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const getDocumentPermissions = async (args)=>{
    const { id, collectionConfig, data = {}, globalConfig, req } = args;
    let docPermissions;
    let hasPublishPermission = false;
    if (collectionConfig) {
        try {
            docPermissions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$collections$2f$operations$2f$docAccess$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["docAccessOperation"])({
                id: id?.toString(),
                collection: {
                    config: collectionConfig
                },
                req: {
                    ...req,
                    data
                }
            });
            if (collectionConfig.versions?.drafts) {
                hasPublishPermission = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$collections$2f$operations$2f$docAccess$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["docAccessOperation"])({
                    id: id?.toString(),
                    collection: {
                        config: collectionConfig
                    },
                    req: {
                        ...req,
                        data: {
                            ...data,
                            _status: 'published'
                        }
                    }
                }).then(({ update })=>update?.permission);
            }
        } catch (error) {
            console.error(error) // eslint-disable-line no-console
            ;
        }
    }
    if (globalConfig) {
        try {
            docPermissions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$globals$2f$operations$2f$docAccess$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__docAccessOperation__as__docAccessOperationGlobal$3e$__["docAccessOperationGlobal"])({
                globalConfig,
                req: {
                    ...req,
                    data
                }
            });
            if (globalConfig.versions?.drafts) {
                hasPublishPermission = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$globals$2f$operations$2f$docAccess$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__docAccessOperation__as__docAccessOperationGlobal$3e$__["docAccessOperationGlobal"])({
                    globalConfig,
                    req: {
                        ...req,
                        data: {
                            ...data,
                            _status: 'published'
                        }
                    }
                }).then(({ update })=>update?.permission);
            }
        } catch (error) {
            console.error(error) // eslint-disable-line no-console
            ;
        }
    }
    const hasSavePermission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasSavePermission"])({
        collectionSlug: collectionConfig?.slug,
        docPermissions,
        globalSlug: globalConfig?.slug,
        isEditing: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEditing"])({
            id,
            collectionSlug: collectionConfig?.slug,
            globalSlug: globalConfig?.slug
        })
    });
    return {
        docPermissions,
        hasPublishPermission,
        hasSavePermission
    };
}; //# sourceMappingURL=getDocumentPermissions.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "EditViewClient": ()=>EditViewClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const EditViewClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call EditViewClient() from the server but EditViewClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Edit/index.client.js", "EditViewClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "EditView": ()=>EditView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const EditView = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditViewClient"], {});
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/ToggleTheme/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ToggleTheme": ()=>ToggleTheme
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const ToggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ToggleTheme() from the server but ToggleTheme is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Account/ToggleTheme/index.js", "ToggleTheme");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/ToggleTheme/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$ToggleTheme$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/ToggleTheme/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$ToggleTheme$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/LanguageSelector.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LanguageSelector": ()=>LanguageSelector
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LanguageSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LanguageSelector() from the server but LanguageSelector is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/LanguageSelector.js", "LanguageSelector");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/LanguageSelector.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$Settings$2f$LanguageSelector$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/LanguageSelector.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$Settings$2f$LanguageSelector$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Settings": ()=>Settings
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$ToggleTheme$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/ToggleTheme/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$Settings$2f$LanguageSelector$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/LanguageSelector.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const baseClass = 'payload-settings';
const Settings = (props)=>{
    const { className, i18n, languageOptions } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: [
            baseClass,
            className
        ].filter(Boolean).join(' '),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h3", {
                children: i18n.t('general:payloadSettings')
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: `${baseClass}__language`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FieldLabel"], {
                        htmlFor: "language-select",
                        label: i18n.t('general:language')
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$Settings$2f$LanguageSelector$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LanguageSelector"], {
                        languageOptions: languageOptions
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$ToggleTheme$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ToggleTheme"], {})
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "meta": ()=>meta
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$dark$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconDark$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/assets/payload-favicon-dark.png [app-rsc] (static) <export default as payloadFaviconDark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$light$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconLight$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/assets/payload-favicon-light.png [app-rsc] (static) <export default as payloadFaviconLight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$static$2d$og$2d$image$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__staticOGImage$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/assets/static-og-image.png [app-rsc] (static) <export default as staticOGImage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/node_modules/qs/lib/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const defaultOpenGraph = {
    description: 'Payload is a headless CMS and application framework built with TypeScript, Node.js, and React.',
    siteName: 'Payload App',
    title: 'Payload App'
};
const meta = async (args)=>{
    const { defaultOGImageType, description, icons: customIcons, keywords, openGraph: openGraphFromProps, serverURL, title, titleSuffix } = args;
    const payloadIcons = [
        {
            type: 'image/png',
            rel: 'icon',
            sizes: '32x32',
            url: typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$dark$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconDark$3e$__["payloadFaviconDark"] === 'object' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$dark$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconDark$3e$__["payloadFaviconDark"]?.src : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$dark$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconDark$3e$__["payloadFaviconDark"]
        },
        {
            type: 'image/png',
            media: '(prefers-color-scheme: dark)',
            rel: 'icon',
            sizes: '32x32',
            url: typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$light$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconLight$3e$__["payloadFaviconLight"] === 'object' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$light$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconLight$3e$__["payloadFaviconLight"]?.src : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$payload$2d$favicon$2d$light$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__payloadFaviconLight$3e$__["payloadFaviconLight"]
        }
    ];
    let icons = customIcons ?? payloadIcons // TODO: fix this type assertion
    ;
    if (customIcons && typeof customIcons === 'object' && Array.isArray(customIcons)) {
        icons = payloadIcons.concat(customIcons) // TODO: fix this type assertion
        ;
    }
    const metaTitle = `${title} ${titleSuffix}`;
    const ogTitle = `${typeof openGraphFromProps?.title === 'string' ? openGraphFromProps.title : title} ${titleSuffix}`;
    const mergedOpenGraph = {
        ...defaultOpenGraph || {},
        ...defaultOGImageType === 'dynamic' ? {
            images: [
                {
                    alt: ogTitle,
                    height: 630,
                    url: `/api/og${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].stringify({
                        description: openGraphFromProps?.description || defaultOpenGraph.description,
                        title: ogTitle
                    }, {
                        addQueryPrefix: true
                    })}`,
                    width: 1200
                }
            ]
        } : {},
        ...defaultOGImageType === 'static' ? {
            images: [
                {
                    alt: ogTitle,
                    height: 480,
                    url: typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$static$2d$og$2d$image$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__staticOGImage$3e$__["staticOGImage"] === 'object' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$static$2d$og$2d$image$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__staticOGImage$3e$__["staticOGImage"]?.src : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$assets$2f$static$2d$og$2d$image$2e$png__$5b$app$2d$rsc$5d$__$28$static$29$__$3c$export__default__as__staticOGImage$3e$__["staticOGImage"],
                    width: 640
                }
            ]
        } : {},
        title: ogTitle,
        ...openGraphFromProps || {}
    };
    return Promise.resolve({
        description,
        icons,
        keywords,
        metadataBase: new URL(serverURL || process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`),
        openGraph: mergedOpenGraph,
        title: metaTitle
    });
}; //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateAccountMetadata": ()=>generateAccountMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateAccountMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: `${t('authentication:accountOfCurrentUser')}`,
        keywords: `${t('authentication:account')}`,
        serverURL: config.serverURL,
        title: t('authentication:account'),
        ...config.admin.meta || {}
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Account": ()=>Account
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentPermissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentPermissions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentData.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$Settings$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
const Account = async ({ initPageResult, params, searchParams })=>{
    const { languageOptions, locale, permissions, req, req: { i18n, payload, payload: { config }, user } } = initPageResult;
    const { admin: { components: { views: { Account: CustomAccountComponent } = {} } = {}, user: userSlug }, routes: { api }, serverURL } = config;
    const collectionConfig = config.collections.find((collection)=>collection.slug === userSlug);
    if (collectionConfig && user?.id) {
        const { docPermissions, hasPublishPermission, hasSavePermission } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentPermissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocumentPermissions"])({
            id: user.id,
            collectionConfig,
            data: user,
            req
        });
        const { data, formState } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocumentData"])({
            id: user.id,
            collectionConfig,
            locale,
            req
        });
        const viewComponentProps = {
            initPageResult,
            params,
            routeSegments: [],
            searchParams
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentInfoProvider"], {
            AfterFields: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$Settings$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Settings"], {
                i18n: i18n,
                languageOptions: languageOptions
            }),
            action: `${serverURL}${api}/${userSlug}${user?.id ? `/${user.id}` : ''}`,
            apiURL: `${serverURL}${api}/${userSlug}${user?.id ? `/${user.id}` : ''}`,
            collectionSlug: userSlug,
            docPermissions: docPermissions,
            hasPublishPermission: hasPublishPermission,
            hasSavePermission: hasSavePermission,
            id: user?.id.toString(),
            initialData: data,
            initialState: formState,
            isEditing: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentHeader"], {
                    collectionConfig: collectionConfig,
                    config: payload.config,
                    hideTabs: true,
                    i18n: i18n,
                    permissions: permissions
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HydrateClientUser"], {
                    permissions: permissions,
                    user: user
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FormQueryParamsProvider"], {
                    initialParams: {
                        depth: 0,
                        'fallback-locale': 'null',
                        locale: locale?.code,
                        uploadEdits: undefined
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderCustomComponent"], {
                        CustomComponent: typeof CustomAccountComponent === 'function' ? CustomAccountComponent : undefined,
                        DefaultComponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditView"],
                        componentProps: viewComponentProps,
                        serverOnlyProps: {
                            i18n,
                            locale,
                            params,
                            payload,
                            permissions,
                            searchParams,
                            user
                        }
                    })
                })
            ]
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Account/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentData.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentPermissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentPermissions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$Settings$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/Settings/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "CreateFirstUserClient": ()=>CreateFirstUserClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const CreateFirstUserClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CreateFirstUserClient() from the server but CreateFirstUserClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.client.js", "CreateFirstUserClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateCreateFirstUserMetadata": ()=>generateCreateFirstUserMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateCreateFirstUserMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: t('authentication:createFirstUser'),
        keywords: t('general:create'),
        serverURL: config.serverURL,
        title: t('authentication:createFirstUser'),
        ...config.admin.meta || {}
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "CreateFirstUserView": ()=>CreateFirstUserView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$forms$2f$buildStateFromSchema$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/forms/buildStateFromSchema/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const CreateFirstUserView = async ({ initPageResult })=>{
    const { req, req: { payload: { config: { admin: { user: userSlug } } } } } = initPageResult;
    const fields = [
        {
            name: 'email',
            type: 'email',
            label: req.t('general:emailAddress'),
            required: true
        },
        {
            name: 'password',
            type: 'text',
            label: req.t('general:password'),
            required: true
        },
        {
            name: 'confirm-password',
            type: 'text',
            label: req.t('authentication:confirmPassword'),
            required: true
        }
    ];
    const formState = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$forms$2f$buildStateFromSchema$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildStateFromSchema"])({
        fieldSchema: fields,
        operation: 'create',
        preferences: {
            fields: {}
        },
        req
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: "create-first-user",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h1", {
                children: req.t('general:welcome')
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("p", {
                children: req.t('authentication:beginCreateFirstUser')
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CreateFirstUserClient"], {
                initialState: formState,
                userSlug: userSlug
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Dashboard/Default/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DefaultDashboard": ()=>DefaultDashboard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/getTranslation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const baseClass = 'dashboard';
const DefaultDashboard = (props)=>{
    const { Link, i18n, i18n: { t }, locale, navGroups, params, payload: { config: { admin: { components: { afterDashboard, beforeDashboard } }, routes: { admin: adminRoute } } }, payload, permissions, searchParams, user } = props;
    const BeforeDashboards = Array.isArray(beforeDashboard) ? beforeDashboard.map((Component, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithServerSideProps"], {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    const AfterDashboards = Array.isArray(afterDashboard) ? afterDashboard.map((Component, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithServerSideProps"], {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SetStepNav"], {
                nav: []
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SetViewActions"], {
                actions: []
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Gutter"], {
                className: `${baseClass}__wrap`,
                children: [
                    Array.isArray(BeforeDashboards) && BeforeDashboards.map((Component)=>Component),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SetViewActions"], {
                                actions: []
                            }),
                            !navGroups || navGroups?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("p", {
                                children: "no nav groups...."
                            }) : navGroups.map(({ entities, label }, groupIndex)=>{
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    className: `${baseClass}__group`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h2", {
                                            className: `${baseClass}__label`,
                                            children: label
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("ul", {
                                            className: `${baseClass}__card-list`,
                                            children: entities.map(({ type, entity }, entityIndex)=>{
                                                let title;
                                                let buttonAriaLabel;
                                                let createHREF;
                                                let href;
                                                let hasCreatePermission;
                                                if (type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityType"].collection) {
                                                    title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(entity.labels.plural, i18n);
                                                    buttonAriaLabel = t('general:showAllLabel', {
                                                        label: title
                                                    });
                                                    href = `${adminRoute}/collections/${entity.slug}`;
                                                    createHREF = `${adminRoute}/collections/${entity.slug}/create`;
                                                    hasCreatePermission = permissions?.collections?.[entity.slug]?.create?.permission;
                                                }
                                                if (type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityType"].global) {
                                                    title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(entity.label, i18n);
                                                    buttonAriaLabel = t('general:editLabel', {
                                                        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(entity.label, i18n)
                                                    });
                                                    href = `${adminRoute}/globals/${entity.slug}`;
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                                                        Link: Link,
                                                        actions: hasCreatePermission && type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityType"].collection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                                            Link: Link,
                                                            "aria-label": t('general:createNewLabel', {
                                                                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(entity.labels.singular, i18n)
                                                            }),
                                                            buttonStyle: "icon-label",
                                                            el: "link",
                                                            icon: "plus",
                                                            iconStyle: "with-border",
                                                            round: true,
                                                            to: createHREF
                                                        }) : undefined,
                                                        buttonAriaLabel: buttonAriaLabel,
                                                        href: href,
                                                        id: `card-${entity.slug}`,
                                                        title: title,
                                                        titleAs: "h3"
                                                    })
                                                }, entityIndex);
                                            })
                                        })
                                    ]
                                }, groupIndex);
                            })
                        ]
                    }),
                    Array.isArray(AfterDashboards) && AfterDashboards.map((Component)=>Component)
                ]
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Dashboard/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateDashboardMetadata": ()=>generateDashboardMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateDashboardMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: `${t('general:dashboard')} Payload`,
        keywords: `${t('general:dashboard')}, Payload`,
        serverURL: config.serverURL,
        title: t('general:dashboard'),
        ...config.admin.meta || {},
        openGraph: {
            title: t('general:dashboard'),
            ...config.admin.meta?.openGraph || {}
        }
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Dashboard/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Dashboard": ()=>Dashboard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/Default/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const Link = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].default || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
const Dashboard = ({ initPageResult, params, searchParams })=>{
    const { locale, permissions, req: { i18n, payload: { config }, payload, user }, visibleEntities } = initPageResult;
    const CustomDashboardComponent = config.admin.components?.views?.Dashboard;
    const collections = config.collections.filter((collection)=>permissions?.collections?.[collection.slug]?.read?.permission && visibleEntities.collections.includes(collection.slug));
    const globals = config.globals.filter((global)=>permissions?.globals?.[global.slug]?.read?.permission && visibleEntities.globals.includes(global.slug));
    const navGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["groupNavItems"])([
        ...collections.map((collection)=>{
            const entityToGroup = {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityType"].collection,
                entity: collection
            };
            return entityToGroup;
        }) ?? [],
        ...globals.map((global)=>{
            const entityToGroup = {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityType"].global,
                entity: global
            };
            return entityToGroup;
        }) ?? []
    ], permissions, i18n);
    const viewComponentProps = {
        Link,
        i18n,
        locale,
        navGroups,
        params,
        payload,
        permissions,
        searchParams,
        user,
        visibleEntities
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HydrateClientUser"], {
                permissions: permissions,
                user: user
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderCustomComponent"], {
                CustomComponent: typeof CustomDashboardComponent === 'function' ? CustomDashboardComponent : undefined,
                DefaultComponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultDashboard"],
                componentProps: viewComponentProps,
                serverOnlyProps: {
                    i18n,
                    locale,
                    params,
                    payload,
                    permissions,
                    searchParams,
                    user
                }
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Dashboard/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/Default/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/API/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateMetadata": ()=>generateMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/getTranslation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const generateMetadata = async ({ collectionConfig, config, globalConfig, i18n })=>{
    const entityLabel = collectionConfig ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(collectionConfig.labels.singular, i18n) : globalConfig ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(globalConfig.label, i18n) : '';
    const metaTitle = `API - ${entityLabel}`;
    const description = `API - ${entityLabel}`;
    return Promise.resolve((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        ...config.admin.meta || {},
        description,
        keywords: 'API',
        serverURL: config.serverURL,
        title: metaTitle,
        ...collectionConfig?.admin.meta || {},
        ...globalConfig?.admin.meta || {}
    }));
}; //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateMetadata": ()=>generateMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/getTranslation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const generateMetadata = async ({ collectionConfig, config, globalConfig, i18n, isEditing })=>{
    const { t } = i18n;
    const entityLabel = collectionConfig ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(collectionConfig.labels.singular, i18n) : globalConfig ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(globalConfig.label, i18n) : '';
    const metaTitle = `${isEditing ? t('general:editing') : t('general:creating')} - ${entityLabel}`;
    const ogTitle = `${isEditing ? t('general:edit') : t('general:edit')} - ${entityLabel}`;
    const description = `${isEditing ? t('general:editing') : t('general:creating')} - ${entityLabel}`;
    const keywords = `${entityLabel}, Payload, CMS`;
    const baseOGOverrides = config.admin.meta.openGraph || {};
    const entityOGOverrides = collectionConfig ? collectionConfig.admin?.meta?.openGraph : globalConfig ? globalConfig.admin?.meta?.openGraph : {};
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        ...config.admin.meta || {},
        description,
        keywords,
        openGraph: {
            title: ogTitle,
            ...baseOGOverrides,
            ...entityOGOverrides
        },
        ...collectionConfig?.admin.meta || {},
        ...globalConfig?.admin.meta || {},
        serverURL: config.serverURL,
        title: metaTitle
    });
}; //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/LivePreview/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateMetadata": ()=>generateMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateMetadata = async ({ collectionConfig, config, globalConfig, i18n, isEditing })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"])({
        collectionConfig,
        config,
        globalConfig,
        i18n,
        isEditing
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/NotFound/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateNotFoundMeta": ()=>generateNotFoundMeta
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateNotFoundMeta = async ({ config, i18n })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: i18n.t('general:pageNotFound'),
        keywords: `404 ${i18n.t('general:notFound')}`,
        serverURL: config.serverURL,
        title: i18n.t('general:notFound')
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Version/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateMetadata": ()=>generateMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/getTranslation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const generateMetadata = async ({ collectionConfig, config, globalConfig, i18n })=>{
    const { t } = i18n;
    let title = '';
    let description = '';
    const keywords = '';
    const doc = {} // TODO: figure this out
    ;
    const formattedCreatedAt = doc?.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDate"])({
        date: doc.createdAt,
        i18n,
        pattern: config?.admin?.dateFormat
    }) : '';
    if (collectionConfig) {
        const useAsTitle = collectionConfig?.admin?.useAsTitle || 'id';
        const entityLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(collectionConfig.labels.singular, i18n);
        const titleFromData = doc?.[useAsTitle];
        title = `${t('version:version')}${formattedCreatedAt ? ` - ${formattedCreatedAt}` : ''}${titleFromData ? ` - ${titleFromData}` : ''} - ${entityLabel}`;
        description = t('version:viewingVersion', {
            documentTitle: doc[useAsTitle],
            entityLabel
        });
    }
    if (globalConfig) {
        const entityLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(globalConfig.label, i18n);
        title = `${t('version:version')}${formattedCreatedAt ? ` - ${formattedCreatedAt}` : ''}${entityLabel}`;
        description = t('version:viewingVersionGlobal', {
            entityLabel
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        ...config.admin.meta || {},
        description,
        keywords,
        serverURL: config.serverURL,
        title,
        ...collectionConfig?.admin.meta || {},
        ...globalConfig?.admin.meta || {}
    });
}; //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateMetadata": ()=>generateMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/getTranslation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const generateMetadata = async ({ collectionConfig, config, globalConfig, i18n })=>{
    const { t } = i18n;
    const entityLabel = collectionConfig ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(collectionConfig.labels.singular, i18n) : globalConfig ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(globalConfig.label, i18n) : '';
    let title = '';
    let description = '';
    const keywords = '';
    const data = {} // TODO: figure this out
    ;
    if (collectionConfig) {
        const useAsTitle = collectionConfig?.admin?.useAsTitle || 'id';
        const titleFromData = data?.[useAsTitle];
        title = `${t('version:versions')}${titleFromData ? ` - ${titleFromData}` : ''} - ${entityLabel}`;
        description = t('version:viewingVersions', {
            documentTitle: data?.[useAsTitle],
            entitySlug: collectionConfig.slug
        });
    }
    if (globalConfig) {
        title = `${t('version:versions')} - ${entityLabel}`;
        description = t('version:viewingVersionsGlobal', {
            entitySlug: globalConfig.slug
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        ...config.admin.meta || {},
        description,
        keywords,
        serverURL: config.serverURL,
        title,
        ...collectionConfig?.admin.meta || {},
        ...globalConfig?.admin.meta || {}
    });
}; //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/getMetaBySegment.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getMetaBySegment": ()=>getMetaBySegment
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getNextRequestI18n$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getNextRequestI18n.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/API/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/LivePreview/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/NotFound/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Version/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const getMetaBySegment = async ({ collectionConfig, config, globalConfig, params })=>{
    const { segments } = params;
    let fn = null;
    const [segmentOne] = segments;
    const isCollection = segmentOne === 'collections';
    const isGlobal = segmentOne === 'globals';
    const isEditing = isGlobal || Boolean(isCollection && segments?.length > 2 && segments[2] !== 'create');
    if (isCollection) {
        // `/:id`
        if (params.segments.length === 3) {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:id/api`
        if (params.segments.length === 4 && params.segments[3] === 'api') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:id/preview`
        if (params.segments.length === 4 && params.segments[3] === 'preview') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:id/versions`
        if (params.segments.length === 4 && params.segments[3] === 'versions') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:id/versions/:version`
        if (params.segments.length === 5 && params.segments[3] === 'versions') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
    }
    if (isGlobal) {
        // `/:slug`
        if (params.segments?.length === 2) {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:slug/api`
        if (params.segments?.length === 3 && params.segments[2] === 'api') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:slug/preview`
        if (params.segments?.length === 3 && params.segments[2] === 'preview') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:slug/versions`
        if (params.segments?.length === 3 && params.segments[2] === 'versions') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
        // `/:slug/versions/:version`
        if (params.segments?.length === 4 && params.segments[2] === 'versions') {
            fn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"];
        }
    }
    const i18n = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getNextRequestI18n$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNextRequestI18n"])({
        config
    });
    if (typeof fn === 'function') {
        return fn({
            collectionConfig,
            config,
            globalConfig,
            i18n,
            isEditing
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateNotFoundMeta"])({
        config,
        i18n
    });
}; //# sourceMappingURL=getMetaBySegment.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/API/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "APIViewClient": ()=>APIViewClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const APIViewClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call APIViewClient() from the server but APIViewClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/API/index.client.js", "APIViewClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/API/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/API/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/API/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "APIView": ()=>APIView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/API/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const APIView = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIViewClient"], {});
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/LivePreview/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LivePreviewClient": ()=>LivePreviewClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LivePreviewClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LivePreviewClient() from the server but LivePreviewClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/LivePreview/index.client.js", "LivePreviewClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/LivePreview/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/LivePreview/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/LivePreview/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LivePreviewView": ()=>LivePreviewView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/LivePreview/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const LivePreviewView = async (props)=>{
    const { initPageResult } = props;
    const { collectionConfig, docID, globalConfig, locale, req: { payload: { config: { admin: { livePreview: topLevelLivePreviewConfig } } } = {} } = {} } = initPageResult;
    let data;
    try {
        if (collectionConfig) {
            data = await initPageResult.req.payload.findByID({
                id: docID,
                collection: collectionConfig.slug,
                depth: 0,
                draft: true,
                fallbackLocale: null
            });
        }
        if (globalConfig) {
            data = await initPageResult.req.payload.findGlobal({
                slug: globalConfig.slug,
                depth: 0,
                draft: true,
                fallbackLocale: null
            });
        }
    } catch (error) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    let livePreviewConfig = topLevelLivePreviewConfig;
    if (collectionConfig) {
        livePreviewConfig = {
            ...livePreviewConfig || {},
            ...collectionConfig.admin.livePreview || {}
        };
    }
    if (globalConfig) {
        livePreviewConfig = {
            ...livePreviewConfig || {},
            ...globalConfig.admin.livePreview || {}
        };
    }
    const breakpoints = [
        ...livePreviewConfig?.breakpoints || [],
        {
            name: 'responsive',
            height: '100%',
            label: 'Responsive',
            width: '100%'
        }
    ];
    const url = typeof livePreviewConfig?.url === 'function' ? await livePreviewConfig.url({
        collectionConfig,
        data,
        globalConfig,
        locale,
        payload: initPageResult.req.payload
    }) : livePreviewConfig?.url;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LivePreviewClient"], {
        breakpoints: breakpoints,
        initialData: data,
        url: url
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateUnauthorizedMetadata": ()=>generateUnauthorizedMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateUnauthorizedMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: t('error:unauthorized'),
        keywords: t('error:unauthorized'),
        serverURL: config.serverURL,
        title: t('error:unauthorized'),
        ...config.admin.meta || {}
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "UnauthorizedView": ()=>UnauthorizedView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const Link = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].default || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
;
const baseClass = 'unauthorized';
const UnauthorizedView = ({ initPageResult })=>{
    const { req: { i18n, payload: { config: { admin: { routes: { logout: logoutRoute } } } } } } = initPageResult;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Gutter"], {
        className: baseClass,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h2", {
                children: i18n.t('error:unauthorized')
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("p", {
                children: i18n.t('error:notAllowedToAccessPage')
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                Link: Link,
                className: `${baseClass}__button`,
                el: "link",
                to: logoutRoute,
                children: i18n.t('authentication:logOut')
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Version/Default/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DefaultVersionView": ()=>DefaultVersionView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const DefaultVersionView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DefaultVersionView() from the server but DefaultVersionView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Version/Default/index.js", "DefaultVersionView");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Version/Default/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$Default$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Version/Default/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$Default$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Version/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "VersionView": ()=>VersionView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Version/Default/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const VersionView = async (props)=>{
    const { initPageResult, routeSegments } = props;
    const { collectionConfig, docID: id, globalConfig, permissions, req, req: { payload, payload: { config } = {}, user } = {} } = initPageResult;
    const versionID = routeSegments[routeSegments.length - 1];
    const collectionSlug = collectionConfig?.slug;
    const globalSlug = globalConfig?.slug;
    const { localization } = config;
    let docPermissions;
    let slug;
    let doc;
    let publishedDoc;
    let mostRecentDoc;
    if (collectionSlug) {
        // /collections/:slug/:id/versions/:versionID
        slug = collectionSlug;
        docPermissions = permissions.collections[collectionSlug];
        try {
            doc = await payload.findVersionByID({
                id: versionID,
                collection: slug,
                depth: 1,
                locale: '*',
                overrideAccess: false,
                req,
                user
            });
            publishedDoc = await payload.findByID({
                id,
                collection: slug,
                depth: 1,
                draft: false,
                locale: '*',
                overrideAccess: false,
                req,
                user
            });
            mostRecentDoc = await payload.findByID({
                id,
                collection: slug,
                depth: 1,
                draft: true,
                locale: '*',
                overrideAccess: false,
                req,
                user
            });
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
    }
    if (globalSlug) {
        // /globals/:slug/versions/:versionID
        slug = globalSlug;
        docPermissions = permissions.globals[globalSlug];
        try {
            doc = await payload.findGlobalVersionByID({
                id: versionID,
                slug,
                depth: 1,
                locale: '*',
                overrideAccess: false,
                req,
                user
            });
            publishedDoc = await payload.findGlobal({
                slug,
                depth: 1,
                draft: false,
                locale: '*',
                overrideAccess: false,
                req,
                user
            });
            mostRecentDoc = await payload.findGlobal({
                slug,
                depth: 1,
                draft: true,
                locale: '*',
                overrideAccess: false,
                req,
                user
            });
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
    }
    const localeOptions = localization && localization?.locales && localization.locales.map(({ code, label })=>({
            label: typeof label === 'string' ? label : '',
            value: code
        }));
    if (!doc) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultVersionView"], {
        doc: doc,
        docPermissions: docPermissions,
        initialComparisonDoc: mostRecentDoc,
        localeOptions: localeOptions,
        mostRecentDoc: mostRecentDoc,
        publishedDoc: publishedDoc,
        versionID: versionID
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/SetDocumentStepNav/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "SetDocumentStepNav": ()=>SetDocumentStepNav
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const SetDocumentStepNav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SetDocumentStepNav() from the server but SetDocumentStepNav is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/SetDocumentStepNav/index.js", "SetDocumentStepNav");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/SetDocumentStepNav/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$SetDocumentStepNav$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/SetDocumentStepNav/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$SetDocumentStepNav$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/AutosaveCell/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "AutosaveCell": ()=>AutosaveCell
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const AutosaveCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AutosaveCell() from the server but AutosaveCell is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/AutosaveCell/index.js", "AutosaveCell");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/AutosaveCell/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$AutosaveCell$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/AutosaveCell/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$AutosaveCell$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/CreatedAt/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "CreatedAtCell": ()=>CreatedAtCell
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const CreatedAtCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CreatedAtCell() from the server but CreatedAtCell is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/CreatedAt/index.js", "CreatedAtCell");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/CreatedAt/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$CreatedAt$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/CreatedAt/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$CreatedAt$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/ID/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "IDCell": ()=>IDCell
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const IDCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call IDCell() from the server but IDCell is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/ID/index.js", "IDCell");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/ID/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$ID$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/ID/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$ID$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/buildColumns.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "buildVersionColumns": ()=>buildVersionColumns
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$AutosaveCell$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/AutosaveCell/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$CreatedAt$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/CreatedAt/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$ID$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/cells/ID/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
const buildVersionColumns = ({ collectionConfig, docID, globalConfig, i18n: { t } })=>{
    const entityConfig = collectionConfig || globalConfig;
    const columns = [
        {
            name: '',
            type: 'date',
            Label: '',
            accessor: 'updatedAt',
            active: true,
            components: {
                Cell: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$CreatedAt$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CreatedAtCell"], {
                    collectionSlug: collectionConfig?.slug,
                    docID: docID,
                    globalSlug: globalConfig?.slug
                }),
                Heading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SortColumn"], {
                    Label: t('general:updatedAt'),
                    name: "updatedAt"
                })
            }
        },
        {
            name: '',
            type: 'text',
            Label: '',
            accessor: 'id',
            active: true,
            components: {
                Cell: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$ID$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IDCell"], {}),
                Heading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SortColumn"], {
                    Label: t('version:versionID'),
                    disable: true,
                    name: "id"
                })
            }
        }
    ];
    if (entityConfig?.versions?.drafts || entityConfig?.versions?.drafts && entityConfig.versions.drafts?.autosave) {
        columns.push({
            name: '',
            type: 'checkbox',
            Label: '',
            accessor: '_status',
            active: true,
            components: {
                Cell: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$cells$2f$AutosaveCell$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AutosaveCell"], {}),
                Heading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SortColumn"], {
                    Label: t('version:type'),
                    disable: true,
                    name: "autosave"
                })
            }
        });
    }
    return columns;
}; //# sourceMappingURL=buildColumns.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "VersionsViewClient": ()=>VersionsViewClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const VersionsViewClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call VersionsViewClient() from the server but VersionsViewClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Versions/index.client.js", "VersionsViewClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Versions/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "VersionsView": ()=>VersionsView,
    "baseClass": ()=>baseClass
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isNumber$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/isNumber.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$SetDocumentStepNav$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/SetDocumentStepNav/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$buildColumns$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/buildColumns.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
const baseClass = 'versions';
const VersionsView = async (props)=>{
    const { initPageResult, searchParams } = props;
    const { collectionConfig, docID: id, globalConfig, req, req: { i18n, payload, payload: { config }, user } } = initPageResult;
    const collectionSlug = collectionConfig?.slug;
    const globalSlug = globalConfig?.slug;
    const { limit, page, sort } = searchParams;
    const { routes: { api: apiRoute }, serverURL } = config;
    let versionsData;
    let limitToUse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isNumber$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNumber"])(limit) ? Number(limit) : undefined;
    if (collectionSlug) {
        limitToUse = limitToUse || collectionConfig.admin.pagination.defaultLimit;
        try {
            versionsData = await payload.findVersions({
                collection: collectionSlug,
                depth: 0,
                limit: limitToUse,
                overrideAccess: false,
                page: page ? parseInt(page.toString(), 10) : undefined,
                req,
                sort: sort,
                user,
                where: {
                    parent: {
                        equals: id
                    }
                }
            });
        } catch (error) {
            console.error(error) // eslint-disable-line no-console
            ;
        }
    }
    if (globalSlug) {
        limitToUse = limitToUse || 10;
        try {
            versionsData = await payload.findGlobalVersions({
                slug: globalSlug,
                depth: 0,
                limit: limitToUse,
                overrideAccess: false,
                page: page ? parseInt(page, 10) : undefined,
                req,
                sort: sort,
                user
            });
        } catch (error) {
            console.error(error) // eslint-disable-line no-console
            ;
        }
        if (!versionsData) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
    }
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$buildColumns$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildVersionColumns"])({
        collectionConfig,
        config,
        docID: id,
        globalConfig,
        i18n
    });
    const fetchURL = collectionSlug ? `${serverURL}${apiRoute}/${collectionSlug}/versions` : globalSlug ? `${serverURL}${apiRoute}/globals/${globalSlug}/versions` : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$SetDocumentStepNav$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SetDocumentStepNav"], {
                collectionSlug: collectionConfig?.slug,
                globalSlug: globalConfig?.slug,
                id: id,
                pluralLabel: collectionConfig?.labels?.plural || globalConfig?.label,
                useAsTitle: collectionConfig?.admin?.useAsTitle || globalConfig?.slug,
                view: i18n.t('version:versions')
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("main", {
                className: baseClass,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Gutter"], {
                    className: `${baseClass}__wrap`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ListQueryProvider"], {
                        data: versionsData,
                        defaultLimit: limitToUse,
                        defaultSort: sort,
                        modifySearchParams: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VersionsViewClient"], {
                            baseClass: baseClass,
                            columns: columns,
                            fetchURL: fetchURL,
                            paginationLimits: collectionConfig?.admin?.pagination?.limits
                        })
                    })
                })
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/getCustomViewByKey.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getCustomViewByKey": ()=>getCustomViewByKey
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isReactComponent$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/isReactComponent.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const getCustomViewByKey = (views, customViewKey)=>{
    return typeof views?.Edit === 'function' ? views?.Edit : typeof views?.Edit === 'object' && views?.Edit?.[customViewKey] && typeof views?.Edit?.[customViewKey] === 'function' ? views?.Edit?.[customViewKey] : views?.Edit?.[customViewKey] ? typeof views?.Edit?.[customViewKey] === 'object' && 'Component' in views.Edit[customViewKey] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isReactComponent$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isReactComponentOrFunction"])(views?.Edit?.[customViewKey].Component) && views?.Edit?.[customViewKey].Component : null;
}; //# sourceMappingURL=getCustomViewByKey.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Root/isPathMatchingRoute.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isPathMatchingRoute": ()=>isPathMatchingRoute
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$path$2d$to$2d$regexp$2f$dist$2e$es2015$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/path-to-regexp/dist.es2015/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const isPathMatchingRoute = ({ currentRoute, exact, path: viewPath, sensitive, strict })=>{
    const keys = [];
    // run the view path through `pathToRegexp` to resolve any dynamic segments
    // i.e. `/admin/custom-view/:id` -> `/admin/custom-view/123`
    const regex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$path$2d$to$2d$regexp$2f$dist$2e$es2015$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathToRegexp"])(viewPath, keys, {
        sensitive,
        strict
    });
    const match = regex.exec(currentRoute);
    const viewRoute = match?.[0] || viewPath;
    if (exact) return currentRoute === viewRoute;
    if (!exact) return viewRoute.startsWith(currentRoute);
}; //# sourceMappingURL=isPathMatchingRoute.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/getCustomViewByRoute.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getCustomViewByRoute": ()=>getCustomViewByRoute
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$isPathMatchingRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/isPathMatchingRoute.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const getCustomViewByRoute = ({ baseRoute, currentRoute, views })=>{
    if (typeof views?.Edit === 'object' && typeof views?.Edit !== 'function') {
        const foundViewConfig = Object.entries(views.Edit).find(([, view])=>{
            if (typeof view === 'object' && typeof view !== 'function' && 'path' in view) {
                const viewPath = `${baseRoute}${view.path}`;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$isPathMatchingRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPathMatchingRoute"])({
                    currentRoute,
                    exact: true,
                    path: viewPath
                });
            }
            return false;
        })?.[1];
        if (foundViewConfig && 'Component' in foundViewConfig) {
            return foundViewConfig.Component;
        }
    }
    return null;
}; //# sourceMappingURL=getCustomViewByRoute.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/getViewsFromConfig.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getViewsFromConfig": ()=>getViewsFromConfig
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/API/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/LivePreview/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Version/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Versions/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getCustomViewByKey.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getCustomViewByRoute.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
const getViewsFromConfig = ({ collectionConfig, config, docPermissions, globalConfig, routeSegments })=>{
    // Conditionally import and lazy load the default view
    let DefaultView = null;
    let CustomView = null;
    let ErrorView = null;
    const { routes: { admin: adminRoute } } = config;
    const views = collectionConfig && collectionConfig?.admin?.components?.views || globalConfig && globalConfig?.admin?.components?.views;
    const livePreviewEnabled = collectionConfig && collectionConfig?.admin?.livePreview || config?.admin?.livePreview?.collections?.includes(collectionConfig?.slug) || globalConfig && globalConfig?.admin?.livePreview || config?.admin?.livePreview?.globals?.includes(globalConfig?.slug);
    if (collectionConfig) {
        const editConfig = collectionConfig?.admin?.components?.views?.Edit;
        const EditOverride = typeof editConfig === 'function' ? editConfig : null;
        if (EditOverride) {
            CustomView = EditOverride;
        }
        if (!EditOverride) {
            const [collectionEntity, collectionSlug, segment3, segment4, segment5, ...remainingSegments] = routeSegments;
            if (!docPermissions?.read?.permission) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
            } else {
                // `../:id`, or `../create`
                switch(routeSegments.length){
                    case 3:
                        {
                            switch(segment3){
                                case 'create':
                                    {
                                        if ('create' in docPermissions && docPermissions?.create?.permission) {
                                            CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Default');
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditView"];
                                        } else {
                                            ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnauthorizedView"];
                                        }
                                        break;
                                    }
                                default:
                                    {
                                        CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Default');
                                        DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditView"];
                                        break;
                                    }
                            }
                            break;
                        }
                    // `../:id/api`, `../:id/preview`, `../:id/versions`, etc
                    case 4:
                        {
                            switch(segment4){
                                case 'api':
                                    {
                                        if (collectionConfig?.admin?.hideAPIURL !== true) {
                                            CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'API');
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIView"];
                                        }
                                        break;
                                    }
                                case 'preview':
                                    {
                                        if (livePreviewEnabled) {
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LivePreviewView"];
                                        }
                                        break;
                                    }
                                case 'versions':
                                    {
                                        if (docPermissions?.readVersions?.permission) {
                                            CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Versions');
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VersionsView"];
                                        } else {
                                            ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnauthorizedView"];
                                        }
                                        break;
                                    }
                                default:
                                    {
                                        const baseRoute = [
                                            adminRoute,
                                            'collections',
                                            collectionSlug,
                                            segment3
                                        ].filter(Boolean).join('/');
                                        const currentRoute = [
                                            baseRoute,
                                            segment4,
                                            segment5,
                                            ...remainingSegments
                                        ].filter(Boolean).join('/');
                                        CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByRoute"])({
                                            baseRoute,
                                            currentRoute,
                                            views
                                        });
                                        break;
                                    }
                            }
                            break;
                        }
                    // `../:id/versions/:version`, etc
                    default:
                        {
                            if (segment4 === 'versions') {
                                if (docPermissions?.readVersions?.permission) {
                                    CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Version');
                                    DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VersionView"];
                                } else {
                                    ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnauthorizedView"];
                                }
                            } else {
                                const baseRoute = [
                                    adminRoute,
                                    collectionEntity,
                                    collectionSlug,
                                    segment3
                                ].filter(Boolean).join('/');
                                const currentRoute = [
                                    baseRoute,
                                    segment4,
                                    segment5,
                                    ...remainingSegments
                                ].filter(Boolean).join('/');
                                CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByRoute"])({
                                    baseRoute,
                                    currentRoute,
                                    views
                                });
                            }
                            break;
                        }
                }
            }
        }
    }
    if (globalConfig) {
        const editConfig = globalConfig?.admin?.components?.views?.Edit;
        const EditOverride = typeof editConfig === 'function' ? editConfig : null;
        if (EditOverride) {
            CustomView = EditOverride;
        }
        if (!EditOverride) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [globalEntity, globalSlug, segment3, ...remainingSegments] = routeSegments;
            if (!docPermissions?.read?.permission) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
            } else {
                switch(routeSegments.length){
                    case 2:
                        {
                            CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Default');
                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditView"];
                            break;
                        }
                    case 3:
                        {
                            // `../:slug/api`, `../:slug/preview`, `../:slug/versions`, etc
                            switch(segment3){
                                case 'api':
                                    {
                                        if (globalConfig?.admin?.hideAPIURL !== true) {
                                            CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'API');
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$API$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIView"];
                                        }
                                        break;
                                    }
                                case 'preview':
                                    {
                                        if (livePreviewEnabled) {
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$LivePreview$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LivePreviewView"];
                                        }
                                        break;
                                    }
                                case 'versions':
                                    {
                                        if (docPermissions?.readVersions?.permission) {
                                            CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Versions');
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Versions$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VersionsView"];
                                        } else {
                                            ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnauthorizedView"];
                                        }
                                        break;
                                    }
                                default:
                                    {
                                        if (docPermissions?.read?.permission) {
                                            CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Default');
                                            DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditView"];
                                        } else {
                                            ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnauthorizedView"];
                                        }
                                        break;
                                    }
                            }
                            break;
                        }
                    default:
                        {
                            // `../:slug/versions/:version`, etc
                            if (segment3 === 'versions') {
                                if (docPermissions?.readVersions?.permission) {
                                    CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByKey$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByKey"])(views, 'Version');
                                    DefaultView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Version$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VersionView"];
                                } else {
                                    ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnauthorizedView"];
                                }
                            } else {
                                const baseRoute = [
                                    adminRoute,
                                    'globals',
                                    globalSlug
                                ].filter(Boolean).join('/');
                                const currentRoute = [
                                    baseRoute,
                                    segment3,
                                    ...remainingSegments
                                ].filter(Boolean).join('/');
                                CustomView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getCustomViewByRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByRoute"])({
                                    baseRoute,
                                    currentRoute,
                                    views
                                });
                            }
                            break;
                        }
                }
            }
        }
    }
    return {
        CustomView,
        DefaultView,
        ErrorView
    };
}; //# sourceMappingURL=getViewsFromConfig.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Document": ()=>Document,
    "generateMetadata": ()=>generateMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/DocumentHeader/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentData.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentPermissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getDocumentPermissions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getMetaBySegment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getMetaBySegment.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getViewsFromConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getViewsFromConfig.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
const generateMetadata = async (args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getMetaBySegment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMetaBySegment"])(args);
const Document = async ({ initPageResult, params, searchParams })=>{
    const { collectionConfig, docID: id, globalConfig, locale, permissions, req, req: { i18n, payload, payload: { config, config: { routes: { admin: adminRoute, api: apiRoute }, serverURL } }, user }, visibleEntities } = initPageResult;
    const segments = Array.isArray(params?.segments) ? params.segments : [];
    const collectionSlug = collectionConfig?.slug || undefined;
    const globalSlug = globalConfig?.slug || undefined;
    const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isEditing"])({
        id,
        collectionSlug,
        globalSlug
    });
    let ViewOverride;
    let CustomView;
    let DefaultView;
    let ErrorView;
    let apiURL;
    let action;
    const { data, formState } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocumentData"])({
        id,
        collectionConfig,
        globalConfig,
        locale,
        req
    });
    const { docPermissions, hasPublishPermission, hasSavePermission } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getDocumentPermissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocumentPermissions"])({
        id,
        collectionConfig,
        data,
        globalConfig,
        req
    });
    if (collectionConfig) {
        if (!visibleEntities?.collections?.find((visibleSlug)=>visibleSlug === collectionSlug)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
        action = `${serverURL}${apiRoute}/${collectionSlug}${isEditing ? `/${id}` : ''}`;
        const params = new URLSearchParams();
        if (collectionConfig.versions?.drafts) {
            params.append('draft', 'true');
        }
        if (locale?.code) {
            params.append('locale', locale.code);
        }
        const apiQueryParams = `?${params.toString()}`;
        apiURL = `${serverURL}${apiRoute}/${collectionSlug}/${id}${apiQueryParams}`;
        const editConfig = collectionConfig?.admin?.components?.views?.Edit;
        ViewOverride = typeof editConfig === 'function' ? editConfig : null;
        if (!ViewOverride) {
            const collectionViews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getViewsFromConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getViewsFromConfig"])({
                collectionConfig,
                config,
                docPermissions,
                routeSegments: segments
            });
            CustomView = collectionViews?.CustomView;
            DefaultView = collectionViews?.DefaultView;
            ErrorView = collectionViews?.ErrorView;
        }
        if (!CustomView && !DefaultView && !ViewOverride && !ErrorView) {
            ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFoundView"];
        }
    }
    if (globalConfig) {
        if (!visibleEntities?.globals?.find((visibleSlug)=>visibleSlug === globalSlug)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
        action = `${serverURL}${apiRoute}/globals/${globalSlug}`;
        const params = new URLSearchParams({
            locale: locale?.code
        });
        if (globalConfig.versions?.drafts) {
            params.append('draft', 'true');
        }
        if (locale?.code) {
            params.append('locale', locale.code);
        }
        const apiQueryParams = `?${params.toString()}`;
        apiURL = `${serverURL}${apiRoute}/${globalSlug}${apiQueryParams}`;
        const editConfig = globalConfig?.admin?.components?.views?.Edit;
        ViewOverride = typeof editConfig === 'function' ? editConfig : null;
        if (!ViewOverride) {
            const globalViews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getViewsFromConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getViewsFromConfig"])({
                config,
                docPermissions,
                globalConfig,
                routeSegments: segments
            });
            CustomView = globalViews?.CustomView;
            DefaultView = globalViews?.DefaultView;
            ErrorView = globalViews?.ErrorView;
            if (!CustomView && !DefaultView && !ViewOverride && !ErrorView) {
                ErrorView = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFoundView"];
            }
        }
    }
    /**
   * Handle case where autoSave is enabled and the document is being created
   * => create document and redirect
   */ const shouldAutosave = hasSavePermission && (collectionConfig?.versions?.drafts && collectionConfig?.versions?.drafts?.autosave || globalConfig?.versions?.drafts && globalConfig?.versions?.drafts?.autosave);
    const validateDraftData = collectionConfig?.versions?.drafts && collectionConfig?.versions?.drafts?.validate;
    if (shouldAutosave && !validateDraftData && !id && collectionSlug) {
        const doc = await payload.create({
            collection: collectionSlug,
            data: {},
            depth: 0,
            draft: true,
            fallbackLocale: null,
            locale: locale?.code,
            req,
            user
        });
        if (doc?.id) {
            const redirectURL = `${serverURL}${adminRoute}/collections/${collectionSlug}/${doc.id}`;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(redirectURL);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
    }
    const viewComponentProps = {
        initPageResult,
        params,
        routeSegments: segments,
        searchParams
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentInfoProvider"], {
        action: action,
        apiURL: apiURL,
        collectionSlug: collectionConfig?.slug,
        disableActions: false,
        docPermissions: docPermissions,
        globalSlug: globalConfig?.slug,
        hasPublishPermission: hasPublishPermission,
        hasSavePermission: hasSavePermission,
        id: id,
        initialData: data,
        initialState: formState,
        isEditing: isEditing,
        children: [
            !ViewOverride && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$DocumentHeader$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentHeader"], {
                collectionConfig: collectionConfig,
                config: payload.config,
                globalConfig: globalConfig,
                i18n: i18n,
                permissions: permissions
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HydrateClientUser"], {
                permissions: permissions,
                user: user
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EditDepthProvider"], {
                depth: 1,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FormQueryParamsProvider"], {
                    initialParams: {
                        depth: 0,
                        'fallback-locale': 'null',
                        locale: locale?.code,
                        uploadEdits: undefined
                    },
                    children: ErrorView ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(ErrorView, {
                        initPageResult: initPageResult,
                        searchParams: searchParams
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderCustomComponent"], {
                        CustomComponent: ViewOverride || CustomView,
                        DefaultComponent: DefaultView,
                        componentProps: viewComponentProps,
                        serverOnlyProps: {
                            i18n,
                            locale,
                            params,
                            payload,
                            permissions,
                            searchParams,
                            user
                        }
                    })
                })
            }, `${collectionSlug || globalSlug}${locale?.code ? `-${locale?.code}` : ''}`)
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/ForgotPasswordForm/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ForgotPasswordForm": ()=>ForgotPasswordForm
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const ForgotPasswordForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ForgotPasswordForm() from the server but ForgotPasswordForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/ForgotPasswordForm/index.js", "ForgotPasswordForm");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/ForgotPasswordForm/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$ForgotPasswordForm$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/ForgotPasswordForm/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$ForgotPasswordForm$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateForgotPasswordMetadata": ()=>generateForgotPasswordMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateForgotPasswordMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: t('authentication:forgotPassword'),
        keywords: t('authentication:forgotPassword'),
        title: t('authentication:forgotPassword'),
        ...config.admin.meta || {},
        serverURL: config.serverURL
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ForgotPasswordView": ()=>ForgotPasswordView,
    "forgotPasswordBaseClass": ()=>forgotPasswordBaseClass
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$ForgotPasswordForm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/ForgotPasswordForm/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
const Link = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].default || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
const forgotPasswordBaseClass = 'forgot-password';
const ForgotPasswordView = ({ initPageResult })=>{
    const { req: { i18n, payload: { config }, user } } = initPageResult;
    const { admin: { routes: { account: accountRoute } }, routes: { admin } } = config;
    if (user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h1", {
                    children: i18n.t('authentication:alreadyLoggedIn')
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("p", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Translation"], {
                        elements: {
                            '0': ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Link, {
                                    href: `${admin}${accountRoute}`,
                                    children: children
                                })
                        },
                        i18nKey: "authentication:loggedInChangePassword",
                        t: i18n.t
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("br", {}),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                    Link: Link,
                    buttonStyle: "secondary",
                    el: "link",
                    to: admin,
                    children: i18n.t('general:backToDashboard')
                })
            ]
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$ForgotPasswordForm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ForgotPasswordForm"], {}),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Link, {
                href: `${admin}/login`,
                children: i18n.t('authentication:backToLogin')
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$ForgotPasswordForm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/ForgotPasswordForm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/List/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateListMetadata": ()=>generateListMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$exports$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/exports/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/translations/dist/utilities/getTranslation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const generateListMetadata = async (args)=>{
    const { collectionConfig, config, i18n } = args;
    let title = '';
    const description = '';
    const keywords = '';
    if (collectionConfig) {
        title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$translations$2f$dist$2f$utilities$2f$getTranslation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslation"])(collectionConfig.labels.plural, i18n);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        ...config.admin.meta || {},
        description,
        keywords,
        serverURL: config.serverURL,
        title,
        ...collectionConfig.admin.meta || {}
    });
}; //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/List/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ListView": ()=>ListView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isReactComponent$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/isReactComponent.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isNumber$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/isNumber.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$mergeListSearchAndWhere$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/utilities/mergeListSearchAndWhere.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$collections$2f$config$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/collections/config/client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
const ListView = async ({ initPageResult, params, searchParams })=>{
    const { collectionConfig, locale: fullLocale, permissions, req, req: { i18n, locale, payload, payload: { config }, query, user }, visibleEntities } = initPageResult;
    const collectionSlug = collectionConfig?.slug;
    if (!permissions?.collections?.[collectionSlug]?.read?.permission) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    let listPreferences;
    const preferenceKey = `${collectionSlug}-list`;
    try {
        listPreferences = await payload.find({
            collection: 'payload-preferences',
            depth: 0,
            limit: 1,
            req,
            user,
            where: {
                key: {
                    equals: preferenceKey
                }
            }
        })?.then((res)=>res?.docs?.[0]?.value);
    } catch (error) {} // eslint-disable-line no-empty
    const { routes: { admin } } = config;
    if (collectionConfig) {
        const { admin: { components: { views: { List: CustomList } = {} } = {} } } = collectionConfig;
        if (!visibleEntities.collections.includes(collectionSlug)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
        }
        let CustomListView = null;
        if (CustomList && typeof CustomList === 'function') {
            CustomListView = CustomList;
        } else if (typeof CustomList === 'object' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isReactComponent$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isReactComponentOrFunction"])(CustomList.Component)) {
            CustomListView = CustomList.Component;
        }
        const page = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isNumber$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNumber"])(query?.page) ? Number(query.page) : 0;
        const whereQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$mergeListSearchAndWhere$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeListSearchAndWhere"])({
            collectionConfig,
            query: {
                search: typeof query?.search === 'string' ? query.search : undefined,
                where: query?.where || undefined
            }
        });
        const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$utilities$2f$isNumber$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNumber"])(query?.limit) ? Number(query.limit) : listPreferences?.limit || collectionConfig.admin.pagination.defaultLimit;
        const sort = query?.sort && typeof query.sort === 'string' ? query.sort : listPreferences?.sort || collectionConfig.defaultSort || undefined;
        const data = await payload.find({
            collection: collectionSlug,
            depth: 0,
            draft: true,
            fallbackLocale: null,
            limit,
            locale,
            overrideAccess: false,
            page,
            req,
            sort,
            user,
            where: whereQuery || {}
        });
        const viewComponentProps = {
            collectionSlug,
            listSearchableFields: collectionConfig.admin.listSearchableFields
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HydrateClientUser"], {
                    permissions: permissions,
                    user: user
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ListInfoProvider"], {
                    collectionConfig: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$collections$2f$config$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClientCollectionConfig"])({
                        collection: collectionConfig,
                        t: initPageResult.req.i18n.t
                    }),
                    collectionSlug: collectionSlug,
                    hasCreatePermission: permissions?.collections?.[collectionSlug]?.create?.permission,
                    newDocumentURL: `${admin}/collections/${collectionSlug}/create`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ListQueryProvider"], {
                        data: data,
                        defaultLimit: limit || collectionConfig?.admin?.pagination?.defaultLimit,
                        defaultSort: sort,
                        modifySearchParams: true,
                        preferenceKey: preferenceKey,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableColumnsProvider"], {
                            collectionSlug: collectionSlug,
                            enableRowSelections: true,
                            listPreferences: listPreferences,
                            preferenceKey: preferenceKey,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderCustomComponent"], {
                                CustomComponent: CustomListView,
                                DefaultComponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultListView"],
                                componentProps: viewComponentProps,
                                serverOnlyProps: {
                                    collectionConfig,
                                    data,
                                    hasCreatePermission: permissions?.collections?.[collectionSlug]?.create?.permission,
                                    i18n,
                                    limit,
                                    listPreferences,
                                    locale: fullLocale,
                                    newDocumentURL: `${admin}/collections/${collectionSlug}/create`,
                                    params,
                                    payload,
                                    permissions,
                                    searchParams,
                                    user
                                }
                            })
                        })
                    })
                })
            ]
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/List/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/elements/Logo/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Logo": ()=>Logo
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const Logo = (props)=>{
    const { i18n, locale, params, payload, permissions, searchParams, user } = props;
    const { admin: { components: { graphics: { Logo: CustomLogo } = {
        Logo: undefined
    } } = {} } = {} } = payload.config;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderCustomComponent"], {
        CustomComponent: CustomLogo,
        DefaultComponent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PayloadLogo"],
        serverOnlyProps: {
            i18n,
            locale,
            params,
            payload,
            permissions,
            searchParams,
            user
        }
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Login/LoginForm/index.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LoginForm": ()=>LoginForm
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LoginForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LoginForm() from the server but LoginForm is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Login/LoginForm/index.js", "LoginForm");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Login/LoginForm/index.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$LoginForm$2f$index$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/LoginForm/index.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$LoginForm$2f$index$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Login/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateLoginMetadata": ()=>generateLoginMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateLoginMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: `${t('authentication:login')}`,
        keywords: `${t('authentication:login')}`,
        serverURL: config.serverURL,
        title: t('authentication:login'),
        ...config.admin.meta || {}
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Login/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LoginView": ()=>LoginView,
    "loginBaseClass": ()=>loginBaseClass
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Logo$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Logo/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$LoginForm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/LoginForm/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const loginBaseClass = 'login';
const LoginView = ({ initPageResult, params, searchParams })=>{
    const { locale, permissions, req } = initPageResult;
    const { i18n, payload: { config }, payload, user } = req;
    const { admin: { components: { afterLogin, beforeLogin } = {}, user: userSlug }, collections, routes: { admin } } = config;
    const BeforeLogins = Array.isArray(beforeLogin) ? beforeLogin.map((Component, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithServerSideProps"], {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    const AfterLogins = Array.isArray(afterLogin) ? afterLogin.map((Component, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithServerSideProps"], {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    if (user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(admin);
    }
    const collectionConfig = collections.find(({ slug })=>slug === userSlug);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: `${loginBaseClass}__brand`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Logo$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Logo"], {
                    i18n: i18n,
                    locale: locale,
                    params: params,
                    payload: payload,
                    permissions: permissions,
                    searchParams: searchParams,
                    user: user
                })
            }),
            Array.isArray(BeforeLogins) && BeforeLogins.map((Component)=>Component),
            !collectionConfig?.auth?.disableLocalStrategy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$LoginForm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LoginForm"], {
                searchParams: searchParams
            }),
            Array.isArray(AfterLogins) && AfterLogins.map((Component)=>Component)
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Login/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Logo$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Logo/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$LoginForm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/LoginForm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Logout/LogoutClient.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LogoutClient": ()=>LogoutClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LogoutClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call LogoutClient() from the server but LogoutClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/Logout/LogoutClient.js", "LogoutClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Logout/LogoutClient.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$LogoutClient$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Logout/LogoutClient.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$LogoutClient$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Logout/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateLogoutMetadata": ()=>generateLogoutMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateLogoutMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: `${t('authentication:logoutUser')}`,
        keywords: `${t('authentication:logout')}`,
        serverURL: config.serverURL,
        title: t('authentication:logout')
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Logout/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LogoutInactivity": ()=>LogoutInactivity,
    "LogoutView": ()=>LogoutView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$LogoutClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Logout/LogoutClient.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const baseClass = 'logout';
;
const LogoutView = ({ inactivity, initPageResult, searchParams })=>{
    const { req: { payload: { config: { routes: { admin } } } } } = initPageResult;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: `${baseClass}__wrap`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$LogoutClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LogoutClient"], {
            adminRoute: admin,
            inactivity: inactivity,
            redirect: searchParams.redirect
        })
    });
};
const LogoutInactivity = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(LogoutView, {
        inactivity: true,
        ...props
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Logout/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$LogoutClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Logout/LogoutClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Logout/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Logout/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.client.js (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ResetPasswordClient": ()=>ResetPasswordClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const ResetPasswordClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ResetPasswordClient() from the server but ResetPasswordClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.client.js", "ResetPasswordClient");

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.client.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$client$2e$js__$28$client__proxy$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.client.js (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$client$2e$js__$28$client__proxy$29$__);

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateResetPasswordMetadata": ()=>generateResetPasswordMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateResetPasswordMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: t('authentication:resetPassword'),
        keywords: t('authentication:resetPassword'),
        serverURL: config.serverURL,
        title: t('authentication:resetPassword'),
        ...config.admin.meta || {}
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ResetPassword": ()=>ResetPassword,
    "resetPasswordBaseClass": ()=>resetPasswordBaseClass
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Minimal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Minimal/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/client/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.client.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
const resetPasswordBaseClass = 'reset-password';
const Link = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].default || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
;
const ResetPassword = ({ initPageResult, params })=>{
    const { req } = initPageResult;
    const { segments: [_, token] } = params;
    const { i18n, payload: { config }, user } = req;
    const { admin: { routes: { account: accountRoute } }, routes: { admin } } = config;
    if (user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Minimal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MinimalTemplate"], {
            className: resetPasswordBaseClass,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: `${resetPasswordBaseClass}__wrap`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h1", {
                        children: i18n.t('authentication:alreadyLoggedIn')
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Translation"], {
                            elements: {
                                '0': ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(Link, {
                                        href: `${admin}${accountRoute}`,
                                        children: children
                                    })
                            },
                            i18nKey: "authentication:loggedInChangePassword",
                            t: i18n.t
                        })
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("br", {}),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$client$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                        Link: Link,
                        buttonStyle: "secondary",
                        el: "link",
                        to: admin,
                        children: i18n.t('general:backToDashboard')
                    })
                ]
            })
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Minimal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MinimalTemplate"], {
        className: resetPasswordBaseClass,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: `${resetPasswordBaseClass}__wrap`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h1", {
                    children: i18n.t('authentication:resetPassword')
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ResetPasswordClient"], {
                    token: token
                })
            ]
        })
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Minimal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Minimal/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Verify/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateVerifyMetadata": ()=>generateVerifyMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateVerifyMetadata = async ({ config, i18n: { t } })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["meta"])({
        description: t('authentication:verifyUser'),
        keywords: t('authentication:verify'),
        serverURL: config.serverURL,
        title: t('authentication:verify'),
        ...config.admin.meta || {}
    }); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Verify/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Verify": ()=>Verify,
    "verifyBaseClass": ()=>verifyBaseClass
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Logo$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Logo/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const verifyBaseClass = 'verify';
;
const Verify = async ({ initPageResult, params, searchParams })=>{
    // /:collectionSlug/verify/:token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [collectionSlug, verify, token] = params.segments;
    const { locale, permissions, req } = initPageResult;
    const { i18n, payload: { config }, payload, user } = req;
    const { routes: { admin: adminRoute } } = config;
    let textToRender;
    try {
        await req.payload.verifyEmail({
            collection: collectionSlug,
            token
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`${adminRoute}/login`);
    } catch (e) {
        // already verified
        if (e?.status === 202) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`${adminRoute}/login`);
        textToRender = req.t('authentication:unableToVerify');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: `${verifyBaseClass}__brand`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Logo$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Logo"], {
                    i18n: i18n,
                    locale: locale,
                    params: params,
                    payload: payload,
                    permissions: permissions,
                    searchParams: searchParams,
                    user: user
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])("h2", {
                children: textToRender
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Verify/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$elements$2f$Logo$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/elements/Logo/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Verify/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Verify/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Root/getCustomViewByRoute.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getCustomViewByRoute": ()=>getCustomViewByRoute
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$isPathMatchingRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/isPathMatchingRoute.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const getCustomViewByRoute = ({ config, currentRoute: currentRouteWithAdmin })=>{
    const { admin: { components: { views } }, routes: { admin: adminRoute } } = config;
    const currentRoute = currentRouteWithAdmin.replace(adminRoute, '');
    const foundViewConfig = views && typeof views === 'object' && Object.entries(views).find(([, view])=>{
        if (typeof view === 'object') {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$isPathMatchingRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPathMatchingRoute"])({
                currentRoute,
                exact: view.exact,
                path: view.path,
                sensitive: view.sensitive,
                strict: view.strict
            });
        }
    })?.[1];
    return typeof foundViewConfig === 'object' ? foundViewConfig.Component : null;
}; //# sourceMappingURL=getCustomViewByRoute.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Root/getViewFromConfig.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getViewFromConfig": ()=>getViewFromConfig
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Logout/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Logout/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Verify/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Verify/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$getCustomViewByRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/getCustomViewByRoute.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$isPathMatchingRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/isPathMatchingRoute.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
;
;
const baseClasses = {
    account: 'account',
    forgot: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["forgotPasswordBaseClass"],
    login: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loginBaseClass"],
    reset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resetPasswordBaseClass"],
    verify: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["verifyBaseClass"]
};
const oneSegmentViews = {
    account: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Account"],
    createFirstUser: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateFirstUserView"],
    forgot: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ForgotPasswordView"],
    inactivity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LogoutInactivity"],
    login: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LoginView"],
    logout: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Logout$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LogoutView"],
    unauthorized: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnauthorizedView"]
};
const getViewFromConfig = ({ adminRoute, config, currentRoute, searchParams, segments })=>{
    let ViewToRender = null;
    let templateClassName;
    let templateType;
    const initPageOptions = {
        config,
        route: currentRoute,
        searchParams
    };
    const [segmentOne, segmentTwo] = segments;
    const isGlobal = segmentOne === 'globals';
    const isCollection = segmentOne === 'collections';
    switch(segments.length){
        case 0:
            {
                if (currentRoute === adminRoute) {
                    ViewToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Dashboard"];
                    templateClassName = 'dashboard';
                    templateType = 'default';
                    initPageOptions.redirectUnauthenticatedUser = true;
                }
                break;
            }
        case 1:
            {
                // users can override the default routes via `admin.routes` config
                // i.e.{ admin: { routes: { logout: '/sign-out', inactivity: '/idle' }}}
                let viewToRender;
                if (config.admin.routes) {
                    const matchedRoute = Object.entries(config.admin.routes).find(([, route])=>{
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$isPathMatchingRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPathMatchingRoute"])({
                            currentRoute,
                            exact: true,
                            path: `${adminRoute}${route}`
                        });
                    });
                    if (matchedRoute) {
                        viewToRender = matchedRoute[0];
                    }
                }
                if (oneSegmentViews[viewToRender]) {
                    // --> /account
                    // --> /create-first-user
                    // --> /forgot
                    // --> /login
                    // --> /logout
                    // --> /logout-inactivity
                    // --> /unauthorized
                    ViewToRender = oneSegmentViews[viewToRender];
                    templateClassName = baseClasses[viewToRender];
                    templateType = 'minimal';
                    if (viewToRender === 'account') {
                        initPageOptions.redirectUnauthenticatedUser = true;
                        templateType = 'default';
                    }
                }
                break;
            }
        case 2:
            {
                if (segmentOne === 'reset') {
                    // --> /reset/:token
                    ViewToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ResetPassword"];
                    templateClassName = baseClasses[segmentTwo];
                    templateType = 'minimal';
                }
                if (isCollection) {
                    // --> /collections/:collectionSlug
                    initPageOptions.redirectUnauthenticatedUser = true;
                    ViewToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListView"];
                    templateClassName = `${segmentTwo}-list`;
                    templateType = 'default';
                } else if (isGlobal) {
                    // --> /globals/:globalSlug
                    initPageOptions.redirectUnauthenticatedUser = true;
                    ViewToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Document"];
                    templateClassName = 'global-edit';
                    templateType = 'default';
                }
                break;
            }
        default:
            if (segmentTwo === 'verify') {
                // --> /:collectionSlug/verify/:token
                ViewToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Verify"];
                templateClassName = 'verify';
                templateType = 'minimal';
            } else if (isCollection) {
                // Custom Views
                // --> /collections/:collectionSlug/:id
                // --> /collections/:collectionSlug/:id/preview
                // --> /collections/:collectionSlug/:id/versions
                // --> /collections/:collectionSlug/:id/versions/:versionId
                // --> /collections/:collectionSlug/:id/api
                initPageOptions.redirectUnauthenticatedUser = true;
                ViewToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Document"];
                templateClassName = `collection-default-edit`;
                templateType = 'default';
            } else if (isGlobal) {
                // Custom Views
                // --> /globals/:globalSlug/versions
                // --> /globals/:globalSlug/preview
                // --> /globals/:globalSlug/versions/:versionId
                // --> /globals/:globalSlug/api
                initPageOptions.redirectUnauthenticatedUser = true;
                ViewToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Document"];
                templateClassName = `global-edit`;
                templateType = 'default';
            }
            break;
    }
    if (!ViewToRender) {
        ViewToRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$getCustomViewByRoute$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomViewByRoute"])({
            config,
            currentRoute
        });
    }
    return {
        DefaultView: ViewToRender,
        initPageOptions,
        templateClassName,
        templateType
    };
}; //# sourceMappingURL=getViewFromConfig.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Document/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generateDocumentMetadata": ()=>generateDocumentMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getMetaBySegment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/getMetaBySegment.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const generateDocumentMetadata = async (args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$getMetaBySegment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMetaBySegment"])(args); //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Root/meta.js [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "generatePageMetadata": ()=>generatePageMetadata
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getNextRequestI18n$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/getNextRequestI18n.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Account/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/CreateFirstUser/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Dashboard/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Document/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ForgotPassword/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Login/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/NotFound/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/ResetPassword/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Unauthorized/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Verify/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Verify/meta.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
;
const oneSegmentMeta = {
    'create-first-user': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$CreateFirstUser$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateCreateFirstUserMetadata"],
    forgot: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ForgotPassword$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateForgotPasswordMetadata"],
    login: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Login$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateLoginMetadata"],
    logout: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateUnauthorizedMetadata"],
    'logout-inactivity': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateUnauthorizedMetadata"],
    unauthorized: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Unauthorized$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateUnauthorizedMetadata"]
};
const generatePageMetadata = async ({ config: configPromise, params })=>{
    const config = await configPromise;
    const segments = Array.isArray(params.segments) ? params.segments : [];
    const [segmentOne, segmentTwo] = segments;
    const isGlobal = segmentOne === 'globals';
    const isCollection = segmentOne === 'collections';
    const i18n = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$getNextRequestI18n$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNextRequestI18n"])({
        config
    });
    let meta;
    // TODO: handle custom routes
    const collectionConfig = isCollection && segments.length > 1 && config?.collections?.find((collection)=>collection.slug === segmentTwo);
    const globalConfig = isGlobal && segments.length > 1 && config?.globals?.find((global)=>global.slug === segmentTwo);
    switch(segments.length){
        case 0:
            {
                meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Dashboard$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateDashboardMetadata"])({
                    config,
                    i18n
                });
                break;
            }
        case 1:
            {
                if (oneSegmentMeta[segmentOne] && segmentOne !== 'account') {
                    // --> /create-first-user
                    // --> /forgot
                    // --> /login
                    // --> /logout
                    // --> /logout-inactivity
                    // --> /unauthorized
                    meta = await oneSegmentMeta[segmentOne]({
                        config,
                        i18n
                    });
                    break;
                } else if (segmentOne === 'account') {
                    // --> /account
                    meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Account$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateAccountMetadata"])({
                        config,
                        i18n
                    });
                    break;
                }
                break;
            }
        case 2:
            {
                if (segmentOne === 'reset') {
                    // --> /reset/:token
                    meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$ResetPassword$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateResetPasswordMetadata"])({
                        config,
                        i18n
                    });
                }
                if (isCollection) {
                    // --> /collections/:collectionSlug
                    meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateListMetadata"])({
                        collectionConfig,
                        config,
                        i18n
                    });
                } else if (isGlobal) {
                    // --> /globals/:globalSlug
                    meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateDocumentMetadata"])({
                        config,
                        globalConfig,
                        i18n,
                        params
                    });
                }
                break;
            }
        default:
            {
                if (segmentTwo === 'verify') {
                    // --> /:collectionSlug/verify/:token
                    meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Verify$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateVerifyMetadata"])({
                        config,
                        i18n
                    });
                } else if (isCollection) {
                    // Custom Views
                    // --> /collections/:collectionSlug/:id
                    // --> /collections/:collectionSlug/:id/preview
                    // --> /collections/:collectionSlug/:id/versions
                    // --> /collections/:collectionSlug/:id/versions/:version
                    // --> /collections/:collectionSlug/:id/api
                    meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateDocumentMetadata"])({
                        collectionConfig,
                        config,
                        i18n,
                        params
                    });
                } else if (isGlobal) {
                    // Custom Views
                    // --> /globals/:globalSlug/versions
                    // --> /globals/:globalSlug/versions/:version
                    // --> /globals/:globalSlug/preview
                    // --> /globals/:globalSlug/api
                    meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Document$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateDocumentMetadata"])({
                        config,
                        globalConfig,
                        i18n,
                        params
                    });
                }
                break;
            }
    }
    if (!meta) {
        meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateNotFoundMeta"])({
            config,
            i18n
        });
    }
    return meta;
}; //# sourceMappingURL=meta.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Root/index.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "RootPage": ()=>RootPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$getViewFromConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/getViewFromConfig.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/initPage/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/ui/dist/exports/shared/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Minimal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Minimal/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Default/index.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
const RootPage = async ({ config: configPromise, params, searchParams })=>{
    const config = await configPromise;
    const { admin: { routes: { createFirstUser: createFirstUserRoute }, user: userSlug }, routes: { admin: adminRoute } } = config;
    const currentRoute = `${adminRoute}${Array.isArray(params.segments) ? `/${params.segments.join('/')}` : ''}`;
    const segments = Array.isArray(params.segments) ? params.segments : [];
    const { DefaultView, initPageOptions, templateClassName, templateType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$getViewFromConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getViewFromConfig"])({
        adminRoute,
        config,
        currentRoute,
        searchParams,
        segments
    });
    let dbHasUser = false;
    if (!DefaultView) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const initPageResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initPage"])(initPageOptions);
    if (initPageResult) {
        dbHasUser = await initPageResult?.req.payload.db.findOne({
            collection: userSlug,
            req: initPageResult?.req
        })?.then((doc)=>!!doc);
        const routeWithAdmin = `${adminRoute}${createFirstUserRoute}`;
        const collectionConfig = config.collections.find(({ slug })=>slug === userSlug);
        const disableLocalStrategy = collectionConfig?.auth?.disableLocalStrategy;
        if (disableLocalStrategy && currentRoute === routeWithAdmin) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(adminRoute);
        }
        if (!dbHasUser && currentRoute !== routeWithAdmin && !disableLocalStrategy) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(routeWithAdmin);
        }
        if (dbHasUser && currentRoute === routeWithAdmin) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(adminRoute);
        }
    }
    const RenderedView = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$ui$2f$dist$2f$exports$2f$shared$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithServerSideProps"], {
        Component: DefaultView,
        serverOnlyProps: {
            initPageResult,
            params,
            searchParams
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !templateType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                children: RenderedView
            }),
            templateType === 'minimal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Minimal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MinimalTemplate"], {
                className: templateClassName,
                children: RenderedView
            }),
            templateType === 'default' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultTemplate"], {
                i18n: initPageResult?.req.i18n,
                locale: initPageResult?.locale,
                params: params,
                payload: initPageResult?.req.payload,
                permissions: initPageResult?.permissions,
                searchParams: searchParams,
                user: initPageResult?.req.user,
                visibleEntities: {
                    // The reason we are not passing in initPageResult.visibleEntities directly is due to a "Cannot assign to read only property of object '#<Object>" error introduced in React 19
                    // which this caused as soon as initPageResult.visibleEntities is passed in
                    collections: initPageResult.visibleEntities?.collections,
                    globals: initPageResult.visibleEntities?.globals
                },
                children: RenderedView
            })
        ]
    });
}; //# sourceMappingURL=index.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/views/Root/index.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Default/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$templates$2f$Minimal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/templates/Minimal/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$initPage$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/initPage/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$getViewFromConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/getViewFromConfig.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/index.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/node_modules/@payloadcms/next/dist/exports/views.js [app-rsc] (ecmascript) <locals>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
;
;
;
;
 //# sourceMappingURL=views.js.map

})()),
"[project]/node_modules/@payloadcms/next/dist/exports/views.js [app-rsc] (ecmascript) <module evaluation>": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Edit$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Edit/Default/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$List$2f$Default$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/List/Default/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$NotFound$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/NotFound/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$views$2f$Root$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/views/Root/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$exports$2f$views$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/exports/views.js [app-rsc] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";

})()),
"[project]/.next-internal/server/app/(payload)/admin/[[...segments]]/page/actions.js { ACTIONS_MODULE0 => \"[project]/node_modules/@payloadcms/next/dist/layouts/Root/index.js [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_export_value__({
    'f6b807fa88381a4ed7facc141bf226eb093db646': (...args)=>Promise.resolve(__turbopack_require__("[project]/node_modules/@payloadcms/next/dist/layouts/Root/index.js [app-rsc] (ecmascript)")).then((mod)=>(0, mod['$$ACTION_0'])(...args))
});

})()),

};

//# sourceMappingURL=_b904a6._.js.map