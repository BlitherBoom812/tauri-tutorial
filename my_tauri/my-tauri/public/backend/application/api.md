### /conv/init_conv
* Params
    None
* Return
```json
{
    "data": {
        "conv_id": "acdb10317b454bcfb635d92ea307f03f",
        "t": "1700836434478"
    },
    "success": true,
    "message": "success"
}
```

### /conv/conv
* Params
```json
{
    "conv_id": "acdb10317b454bcfb635d92ea307f03f",
    "query": "weqwewqeqwew"
}
```
* Return
```json
{
    "data": {
        // data
    },
    "success": true,
    "message": "success"
}
```
### /conv/add
* Params
```json
{
    "conv_id": "acdb10317b454bcfb635d92ea307f03f",
    "source": "1", // 优选
    "target": "2", // 备选
    "node_type": "Action / Switch / While",
    "data": workflow
}
```
* Return
```json
{
    "data": {
        // data
    },
    "success": true,
    "message": "success"
}
```

### /conv/remove
* Params
```json
{
    "conv_id": "acdb10317b454bcfb635d92ea307f03f",
    "node_id": "1",
    "data": workflow
}
```
* Return
```json
{
    "data": {
        // data
    },
    "success": true,
    "message": "success"
}
```

### /conv/update
* Params
```json
{
    "conv_id": "acdb10317b454bcfb635d92ea307f03f",
    "node_id": "1",
    "params": {"key": "value"},
    "data": workflow
}
```
* Return
```json
{
    "data": {
        // data
    },
    "success": true,
    "message": "success"
}
```