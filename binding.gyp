{
  "targets": [
    {
      "target_name": "randomprime",
      "sources": [ "./native/randomprime.cpp" ],
      "conditions": [
        ["OS=='win'", {
          "libraries": [
            "-l<(module_root_dir)/native/lib/randomprime",
            "-lcredui.lib",
            "-lmsimg32.lib",
            "-lopengl32.lib",
            "-lsecur32.lib",
            "-lsetupapi.lib",
            "-lws2_32.lib",
            "-luserenv.lib",
            "-lmsvcrt.lib"
          ]
        }],
        ["OS=='mac'", {
          "libraries": [
            "<(module_root_dir)/native/lib/librandomprime_mac.a"
          ]
        }],
        ["OS=='linux'", {
          "libraries": [
            "<(module_root_dir)/native/lib/librandomprime_linux.a"
          ]
        }]
      ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'xcode_settings': {
          'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
          'CLANG_CXX_LIBRARY': 'libc++',
          'MACOSX_DEPLOYMENT_TARGET': '10.7',
      },
      'msvs_settings': {
          'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      }
    }
  ]
}

