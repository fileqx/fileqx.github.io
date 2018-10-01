 var currentDate = new Date();
               // currentDate.setHours(7, 25);
               // currentDate.setDate(24);
            console.log(currentDate);
           function day(numD)
           {
               switch (numD)
               {
                   case 0: return "Niedziela"
                   break;
                   case 1: return monday
                   break;
                   case 2: return tuesday
                   break;
                   case 3: return wednesday
                   break;
                   case 4: return thursday
                   break;
                   case 5: return friday
                   break;
                   case 6: return "Sobota"
                   break;
               };
           }
           
           function plan(poczatek, dzien, lekcje, sala)
           {
               this.poczatek = poczatek;
               this.dzien = dzien;
               this.lekcje = lekcje;
               this.sala = sala;
           }
           
           var monday = new plan(1, "Poniedziałek", ["J. Francuski (roz)", "Religia", "Matematyka", "J. Polski", "J. polski", "J. angielski"], ["31", "41?", "61", "17", "?", "31/49"]);
           var tuesday = new plan(1, "Wtorek", ["Godzina wychowawcza", "J. angielski / Informatyka", "Informatyka / J. ang", "Matematyka", "Historia", "W-F","Jezyk Niemiecki / J. Francuski (podst.)"], ["31", "45/31", "45/30", "61", "71", "-", "57/42/10//34"]);
           var wednesday = new plan(0, "Środa", ["W-F", "EDB", "Religia", "Chemia", "WOK", "Matematyka", "Matematyka"], ["-", "11", "54A?", "54", "70", "61", "61"]);
           var thursday = new plan(1, "Czwartek", ["WOS", "Biologia", "J. angielski", "W-F", "PP", "Historia"], ["41", "71", "31/57", "-", "68", "71"]);
           var friday = new plan(0, "Piątek", ["J. Niemiecki", "PP", "Fizyka", "Matematyka", "Geografia", "J. polski", "J. polski", "J. Francuski"], ["57/42/10", "41", "13", "61", "41", "54", "54", "34/37"]);
           
           function checkGroupName(value) {
               if(value == 1)
                   {
                       var groupEng = document.getElementById("ang");
                       var selectedEng = groupEng.options[groupEng.selectedIndex].value;
                       if(selectedEng == "zaaw")
                           {
                               console.log("Grupa pani Sejdak");
                           }
                       else
                           {
                               console.log("Grupa pani Ciesielskiej");
                           }
                   }
                else
                {
                     var groupDeu = document.getElementById("niem");
                     var selectedDeu = groupDeu.options[groupDeu.selectedIndex].value;

                     switch(selectedDeu)
                       {
                           case "deu1":
                               console.log("Borkowska");
                               break;
                           case "deu2":
                               console.log("Górska");
                               break;
                           case "deu3":
                               console.log("Ulatowska");
                               break;
                           case "fra1":
                               console.log("francuski 1");
                               break;
                           case "fra2":
                               console.log("francuski 2");
                               break;
                       }
                }   
           }
           
           function customTime(hours, minutes)
               {
                   var custom = new Date();
                   custom.setHours(hours, minutes, 0);
                   custom = custom.getHours()*60 + custom.getMinutes();
                   return custom;
               }
               
               var lessonHours = [customTime(7, 40), customTime(8, 30), customTime(9, 25), customTime(10, 20), customTime(11, 25), customTime(12, 20), customTime(13, 15), customTime(14, 10), customTime (15, 0)];
               
               var endHours = [customTime(08, 25), customTime(09, 15), customTime(10, 10), customTime(11, 05), customTime(12, 10), customTime(13,05), customTime(14, 00), customTime(14, 55)];
           
           function checkLesson(abc)
           {
               var time = currentDate.getHours()*60 + currentDate.getMinutes();
               
               var lessonHour;
               
               if(time < lessonHours[abc.poczatek])
                   {
                       return ["Przed lekcjami", 0, "-"];
                   }
               else if(time >= endHours[abc.lekcje.length + abc.poczatek- 1])
                   {
                       return ["Brak lekcji", 0, "-"];
                   }
               else
                  {
                      
                      if(lessonHours.indexOf(time) == -1)
                        {
                            var x = lessonHours.find(function(l){ return l >= time});
                            var xd = endHours.find(function(l){return l >= time})
                            if(endHours.indexOf(time) !== -1 || xd > x)
                                {
                                    lessonHour = lessonHours.indexOf(x) - 1;
                                    lessonHour = lessonHour - abc.poczatek;
                                    salaNumber = abc.sala[lessonHour];
                                    return ["Przerwa", lessonHour, salaNumber];
                                }
                            else
                                {
                                    lessonHour = lessonHours.indexOf(x) - 1;
                                    lessonHour = lessonHour - abc.poczatek;
                                    salaNumber = abc.sala[lessonHour];
                                    return [abc.lekcje[lessonHour], lessonHour, salaNumber];
                                }
                        }
                      else
                        {
                            lessonHour = lessonHours.indexOf(time);
                            lessonHour = lessonHour - abc.poczatek;
                            salaNumber = abc.sala[lessonHour];
                            return [abc.lekcje[lessonHour], lessonHour, salaNumber];
                        }
                  }
           }
           
           function nextLessons(abc)
           {
               var huj = checkLesson(abc)[0];
               var lessonsToday = abc.lekcje;
               var roomsToday = abc.sala;
               var lessonsToRemove = checkLesson(abc)[1];
               lessonsToday.splice(0, lessonsToRemove + 1);
               roomsToday.splice(0, lessonsToRemove + 1);
               if(lessonsToday.length == 0 || huj == "Brak lekcji") 
               {
                   return "Brak";
               }
               else
               { 
                   var value = "<ul>";
                   for(i=0; i < lessonsToday.length; i++)
                   {
                       value += "<li>" + lessonsToday[i] + " | " + roomsToday[i] + "</li>";
                   }

                   return value;
               }
           }
           
           function timeToAlert(xddd)
           {
               console.log(checkLesson(xddd)[0]);
               var time = currentDate.getHours()*60 + currentDate.getMinutes();
               if(checkLesson(xddd)[0] == "Przerwa")
                   {
                       var toNextLessons = lessonHours[checkLesson(xddd)[1] + xddd.poczatek + 1];
                       return toNextLessons - time + "min";
                   }
               else if(checkLesson(xddd)[0] == "Brak lekcji")
               {
                   return "-";
               }
               else if(checkLesson(xddd)[0] == "Przed lekcjami")
                   {
                       var toNextBreak = endHours[checkLesson(xddd)[1] + xddd.poczatek];
                       return toNextBreak - time - 45 + " min";
                   }
               else
                   {
                       var toNextBreak = endHours[checkLesson(xddd)[1] + xddd.poczatek];
                       return toNextBreak - time + " min";
                   }
           }
           
           function hideOnOff()
           {
               var hiddenElement = document.getElementById("check");
               if(hiddenElement.style.display === "none")
                   {
                       hiddenElement.style.display = "block";
                   }
               else
                   {
                       hiddenElement.style.display = "none";
                   }
           }
           function allLessons()
            {
                var valuee = "";
                for(i = 1; i < 6; i++)
                    {
                        var startHour = "";
                        var endHour = "";
                        lessonHours[day(i).poczatek] == 460 ? startHour = "7:40" : startHour = "8:30";
                        endHours[day(i).lekcje.length - 1] == 840 ? endHour = "14:00" : endHour = "14:55";
                        console.log(lessonHours[day(i).lekcje.length - 1])
                        valuee += "<h2>" + day(i).dzien + " | " + startHour + " - " + endHour + "</h2><ul>";
                        var lessonsTodays = day(i).lekcje;
                        for(x = 0; x < lessonsTodays.length; x++)
                            {
                                valuee += "<li>" + day(i).lekcje[x] + " | " + day(i).sala[x] + "</li>";
                            }
                        valuee += "</ul>";
                    }
                return valuee;
            }
