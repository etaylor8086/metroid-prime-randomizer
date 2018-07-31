{
  "targets": [
    {
      "target_name": "randomprime",
      "sources": [ "./native/randomprime.c" ],
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
        }]
      ]
    }
  ]
}
