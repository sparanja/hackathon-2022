from transformers import pipeline


def forage_for_food(transcript):
    classifier = pipeline("zero-shot-classification")
    score = classifier(transcript, ['food'])
    return(score['scores'][0])


deffo_not_food = "How to improve your dining room by the Home Depot, New wood floors, new paint on the walls. Sure. You know us for that. But how about a new dining room table, matching chairs, bar stools? How about free and flexible delivery? With easy online returns? Now, you can explore decor in a whole new way, Save now on furniture, everything for your home, everything from home depot.com. How doers get more done? Us only valid through September seven limitations apply."
deffo_food = "Wendy's founder Dave Thomas knew that you like to surprise now and then and that's why Wendy's brought it back are wild mountain bacon cheeseburger of course it's still prepared fresh of the beef is hot and juicy would you experience a nice kid from the hot and Smoky Southwestern peppersauce leaving out of colby jack cheese and bacon and we still do today so don't wait Wendy's it's better here"

shouldnt_be_1 = forage_for_food(deffo_not_food)
print("this shouldn't be close to 1:", shouldnt_be_1)
shouldnt_be_0 = forage_for_food(deffo_food)
print("this shouldn't be close to 0:", shouldnt_be_0)
