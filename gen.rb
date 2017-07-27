#!ruby
require "fileutils"
require "json"

files = Dir["img/*.jpg"].to_a.map{|n| File.basename(n) }.sort_by{|n| n.split(/ /).last.to_i }
last = files.last.to_i
data = JSON.parse(File.read("data.json"))
Dir["raw/src/*"].each do |raw|
    last += 1
    system("convert -resize 1920x1080 '%s' 'img/%d.jpg'" % [raw, last])
    system("open 'img/%d.jpg'" % [last])
    system("nano 'img/%d.jpg.txt'" % [last])
    FileUtils.mv(raw, "raw/done/")
    files << "#{last}.jpg"
    data << {
        :id => last.to_i,
        :url => "#{last}.jpg",
        :text => File.read("img/#{last}.jpg.txt").strip
    }
end

File.open("data.json", "w") do |fp|
    fp.write JSON.pretty_generate(data)
end

exit
data.each do |img|
    page = File.read("template.html")
    page.gsub!("%id", img["id"].to_s)
    page.gsub!("%text", img["text"])
    if img["id"] <= 1
        page.gsub!("%prev_id", data.last["id"].to_s)
    else
        page.gsub!("%prev_id", (img["id"] - 1).to_s)
    end
    
    if img["id"] >= data.last["id"]
        page.gsub!("%next_id", "1")
    else
        page.gsub!("%next_id", (img["id"] + 1).to_s)
    end

    File.open("page/#{img["id"]}.html", "w") do |fp|
        fp.write(page)
    end

end
