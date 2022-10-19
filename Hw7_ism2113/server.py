from crypt import methods
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


current_id = 10

classes = {
    "1": { 
        "id": "1", 
        "title": "Rumble Boxing", 
        "type": ["Boxing", "Strength", "HIIT"],
        "media": "https://www.youtube.com/embed/mlI2PiuTYcs", 
        "alt": "Rumble Boxing studio and class overview Youtube video",
        "summary": "Rumble Boxing combines the sweet science of boxing with the transformative power of strength training. It’s a high-octane 10 round fight that offers authentic HIIT (High Intensity Interval Training), metabolic conditioning (MetCon), and the benefits of cardio in one seamless class. It’s group fitness for the individual. Rumble was created to shake up the stale norms of the group fitness world, and we remain committed to less cheesy fitness B.S. and more authenticity.", 
        "locations": ["Upper East Side", "Noho", "Tribeca", "Flatiron"], 
        "price": "36",  
        "classes": ["Full Body Knockout", "Power Arms & Abs", "Rumble Boxing"] 
    }, 
     "2": { 
        "id": "2", 
        "title": "CorePower Yoga", 
        "type": ["Yoga", "HIIT"],
        "media":"https://www.youtube.com/embed/hRW3LcT_EXo", 
        "alt:": "CorePower Yoga studio and class overview Youtube video",
        "summary": "We started out with a belief that yoga can transform you—on and off the mat. It’s more than just traditional yoga—it’s a fitness-focused approach that blends yoga principles, strength training, heat, and mindfulness to create the perfect well-rounded workout program. Our mission: To show the world the incredible life-changing things that happen when you root an intensely physical workout in the mindfulness of yoga. CorePower Yoga shares the transformative power of yoga with every mind, every body, everywhere.",
        "locations": ["Bryant Park", "Flatiron", "NoHo", "NoMad", "Rock Center", "The  Village", "Upper East Side", "Upper West Side"], 
        "price": "33",  
        "classes": ["C1", "C2", "YogaSculpt", "Hot Power Fusion", "Core Restore"] 
        },
    "3": { 
        "id": "3", 
        "title": "Pure Barre", 
        "type": ["Toning", "Flexibility"],
        "media":"https://www.youtube.com/embed/ZRWoHDdsJHY",
        "alt": "Pure Barre studio and class overview Youtube video",
        "summary": "Pure Barre invites everybody to join a total-body fitness experience with us at the barre. Our group classes focus on low-impact, small movements that strengthen and tone your entire body in 50 minutes or less. Pure Barre is a total-body barre workout that transforms you physically and mentally. Pure Barre focuses on small movements that result in big changes.",
        "locations": ["Upper West Side", "Upper East Side", "Central Park South", "Upper West Side", "Flatiron"], 
        "price": "22",  
        "classes": ["Foundations", "Classic", "Pure Reform", "Pure Empower"]     
    }, 
    "4": { 
        "id": "4", 
        "title": "Barry's Boot Camp", 
        "type": ["HIIT", "Strength", "Cardio"],
        "media":"https://www.barrys.com/the-workout/", 
        "alt:": "Barry's website showing images of people working out",
        "summary": "Burn up to 1,000 calories. Our high intensity interval training will push you to your limits. Husle for that muscle with top instructors that push you to be your best. The beat drop -- carefully curated playlists that inspire you to sprint faster and lift heavier. Run, lift, recover -- alternating muscle focus to ensure the body gets a balanced workout and proper time to recover.",
        "locations": ["Chelsea", "Upper East Side - East 86th", "NoHo", "Park  Ave", "Upper West Side", "Tribeca"], 
        "price": "36",  
        "classes": ["Arms & Abs", "Full Body (Lower Focus)", "Full Body (Upper Focus)", "Total Body"] 
    }, 
    "5": { 
        "id": "5", 
        "title": "SolidCore", 
        "type": ["Pilates", "Toning", "Flexibility"],
        "media":"https://www.youtube.com/embed/FSZO4iaHhvo", 
        "alt": "Solidcore studio and class overview Youtube video",
        "summary": "[solidcore] is Pilates redefined - a 50-minute, full-body workout that utilizes slow and controlled movements, designed to break down muscles to failure so that they build back stronger and leaner. It’s an immersive experience, under blue neon lights, with energizing music, an encouraging coach and a community of people joined together to create the strongest version of themselves. The workout is intense, but results are unbelievable. You’ve tried Pilates, now it’s time for [solidcore].",
        "locations": ["Chelsea", "Dumbo", "FiDi", "Grand Central", "Nolita", "NoMad", "SoHo", "Columbus Circle"], 
        "price": "41",  
        "classes": ["Foundation", "Full Body", "Arms & Abs", "Core30"] 
    }, 
    "6": { 
        "id": "6", 
        "title": "Cycle Bar", 
        "type": ["Cycling", "Cardio"],
        "media":"https://www.cyclebar.com/franchise", 
        "alt": "Cycle Bar studio and class overview Youtube video",
        "summary": "CycleBar exists to invigorate. Our riders come to feel alive. To live in the moment, and live for themselves. Because they know whether they ride the best in class or are just starting out, CycleBar is where they belong. We are driven by music. Not swayed by fads. Never a follower. Always accepting. A little bit of a rebel. A lot of heart.",
        "locations": ["Upper East Side - 67th", "", "NoMad", "Tribeca"], 
        "price": "34",  
        "classes": ["Classic", "Empower", "Xpress"] 
    }, 
    "7": { 
        "id": "7", 
        "title": "Bode Yoga NYC", 
        "type": ["Yoga", "HIIT", "Flexibility", "Toning"],
        "media":"https://www.bodenyc.com/blog/introducing-the-zen-series",
        "alt": "Bode's website showing their flower logo on blue background",
        "summary": "Over the past two decades we’ve welcomed hundreds of thousands of people into our studios. The 26+2 Series (Original Hot Yoga) provides the foundation of what we offer, with a variety of other classes meant to complement a regular hot yoga practice. With three convenient ways to join us — in-studio, live stream, and on-demand — it’s never been easier to get started! We are an incredible community who all believe in the power that comes from a consistent hot yoga practice!",
        "locations": ["Upper West Side", "Flatiron", "Upper East Side"], 
        "price": "35",  
        "classes": ["Original Hot Yoga", "HIIT", "Yin Yoga"] 
    }, 
    "8": { 
        "id": "8", 
        "title": "Soul Cycle", 
        "type": ["Cycling", "Cardio"],
        "media":"https://www.youtube.com/embed/MgdcVoTD70s",
        "alt":  "Soul Cycle studio and class overview Youtube video",
        "summary": "Our bikes may be stationary but they will take you as far as your mind wants to travel. All it takes is one ride to go there. Go from stuck to soaring, timid to tenacious, tired to inspired in 45 minutes. It’s more than a workout. It’s SOUL.", 
        "locations": ["Bryant Park", "Chelsea", "Midtown - E 54th St", "Midtown - 63rd St", "Upper East Side", "Financial District", "Grand Central", "Hudson Yards", "384 Lafayette St", "NoHo", "NoMad", "SoHo", "Tribeca", "Upper West Side - W 77th", "West Village"], 
        "price": "38",  
        "classes": ["Soul Cycle"] 
    }, 
    "9": { 
        "id": "9", 
        "title": "The Fhitting Room", 
        "type": ["Boxing", "Strength", "Toning"],
        "media":"https://www.youtube.com/embed/FEdbzJBcds", 
        "alt":  "The Fhitting studio and class overview Youtube video",
        "summary": "We believe in the powe rof every body. Unlock your storngest + most confient slef with kettlebells in our HIIT + strength classes. Expect tons of personal attention form our certified trainers and a group energy that is unmatched. Our workouts are science-backed adn crafted to help you feel safe, seen, and welcome, regardless of fitness background.",
        "locations": ["Flatiron", "Upper West Side", "Upper East Side"], 
        "price": "38",  
        "classes": ["Classic"] 
    }, 
    "10": { 
        "id": "10", 
        "title": "305 Fitness", 
        "type": ["Dance", "Cardio", "HIIT"],
        "media":"https://305fitness.com/", 
        "alt": "305 Fitness website showing bright colors and people dancing",
        "summary": "305 Fitness is a dance cardio workout with a live DJ. It's fun, wild, and hard AF. 305 exists to make fitness more inclusive, empowering, and fun. Movement is more than calorie counting or being the 'best' int he room.",
        "locations": ["The Village", "Midtown"], 
        "price": "34",  
        "classes": ["305 Cardio", "305 Cardio Advanced", "PWR"] 
    }, 
}

# ROUTES

@app.route('/')
def homePage():
    data_return = [classes["1"], classes["5"], classes["3"]]
    return render_template('hello_world.html',  data = data_return)  

    
@app.route('/data/<id>')
def showData(id=None):
    global classes 

    viewing = classes[id]
    print(viewing)

    #send back the WHOLE array of data, so the client can redisplay it
    return render_template('class.html', data=viewing)

@app.route('/search/<term>')
def showResults(term=None):
    global classes 

    title_data = []
    type_data = []
    location_data = []
    newTerm = term
    newTerm = newTerm.lower()
    for e in classes.values():

        if newTerm in e["title"].lower():
            title_data.append(e)

        outList = [i.lower() for i in e["type"]]
        for t in outList:
            if newTerm in t and e not in type_data:
                type_data.append(e)

        locationList = [i.lower() for i in e["locations"]]
        for l in locationList:
            if newTerm in l and e not in location_data:
                location_data.append(e)
    #send back the WHOLE array of data, so the client can redisplay it
    return render_template('search_results.html', title_data = title_data, type_data = type_data, location_data = location_data, search = term)

@app.route('/add')
def add():
    return render_template('add.html')

@app.route('/save_entry', methods=['POST'])
def save_entry():
    global classes
    global current_id

    json_data = request.get_json() 
    print(json_data)

    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    key = str(current_id)
    types = json_data["type"].split(",")
    locationsList = json_data["locations"].split(",")
    classesList = json_data["classes"].split(",")

    value = {
        "id":key,
        "title":json_data["title"],
        "type":types,
        "media":json_data["media"],
        "alt": json_data["alt"],
        "summary":json_data["summary"],
        "locations":locationsList,
        "price":json_data["price"],
        "classes": classesList
    }
    classes[key] = value

    print(classes)

    return jsonify(data = classes, id = key)

@app.route('/edit/<id>')
def showEdit(id=None):
    global classes 

    viewing = classes[id]
    print(viewing)

    #send back the WHOLE array of data, so the client can redisplay it
    return render_template('edit.html', data=viewing, id = id)

@app.route('/edit/edit_entry', methods=['POST'])
def edit_entry():
    global classes

    json_data = request.get_json() 
    print(json_data)

    key = json_data['id']
    types = json_data["type"].split(",")
    locationsList = json_data["locations"].split(",")
    classesList = json_data["classes"].split(",")

    value = {
        "id":key,
        "title":json_data["title"],
        "type":types,
        "media":json_data["media"],
        "alt": json_data["alt"],
        "summary":json_data["summary"],
        "locations":locationsList,
        "price":json_data["price"],
        "classes": classesList
    }
    classes[key] = value

    viewing = classes[key]

    print(classes)

    return jsonify(data = viewing, id=key)






if __name__ == '__main__':
   app.run(debug = True)




