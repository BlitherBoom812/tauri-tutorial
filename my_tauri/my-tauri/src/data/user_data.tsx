
  // var def
  const CurriculumList = [
    {
      name: '下载',
      action_list: [
        {
          name: '打开目录',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ['C:\\Users\\Guo_Yun\\Downloads'],
          },
        },
      ],
    },
    {
      name: '量筒',
      action_list: [
        {
          name: '主页',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\量筒"],
          },
        },
        {
          name: '作业',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\量筒\\hw"],
          },
        },
        {
          name: '课件',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\量筒\\课件"],
          },
        },
        {
          name: 'wiki',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\量筒\\wiki"],
          },
        },
      ],
    },
    {
      name: '通网',
      action_list: [
        {
          name: '主页',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\通网"],
          },
        },
        {
          name: '作业',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\通网\\hw"],
          },
        },
        {
          name: '实验',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\通网\\lab"],
          },
        },
        {
          name: '课件',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\通网\\"],
          },
        },
      ],
    },
    {
      name: '随机过程',
      action_list: [
        {
          name: '主页',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\随机过程"],
          },
        },
        {
          name: '作业',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\随机过程\\hw"],
          },
        },
        {
          name: '课件',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\随机过程\\课件"],
          },
        },
      ],
    },
    {
      name: 'DSP',
      action_list: [
        {
          name: '主页',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\DSP"],
          },
        },
        {
          name: '课件',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\DSP"],
          },
        },
      ],
    },
    {
      name: '计网',
      action_list: [
        {
          name: '主页',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\计网"],
          },
        },
        {
          name: '作业',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\计网\\hw"],
          },
        },
        {
          name: '课件',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: ["D:\\STUDY\\课程资料\\计网"],
          },
        },
      ],
    },
    {
      name: '启动',
      action_list: [
        {
          name: '启动！',
          action: 'handle_action',
          args: {
            program: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            args: ["https://www.bilibili.com/video/BV1a14y1i7N4/"],
          }
        }
      ]
    },
  ];

export {CurriculumList};