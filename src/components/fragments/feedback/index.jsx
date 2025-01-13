import React, { useState, useEffect } from "react";

const reviews = [
    {
        id: 1,
        name: "Marie Poirot",
        role: "BigApp",
        text: "Aplikasi ini benar-benar membantu meningkatkan kemandirian saya sehari-hari. Fitur navigasinya sangat membantu saya dalam menjelajahi kota.  Saya merasa lebih percaya diri dan aman berkat teknologi yang disediakan.",
        image: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" 
    },
    {
        id: 2,
        name: "John Doe",
        role: "TechCorp",
        text: "Teknologi yang ditawarkan sangat inovatif dan mudah digunakan. Ini benar-benar mempermudah hidup saya dalam berbagai aspek.",
        image: "https://www.gabrielgorgi.com/wp-content/uploads/2019/12/01.jpg" 
    },
    {
        id: 3,
        name: "Jane Smith",
        role: "InnovateX",
        text: "Pengalaman menggunakan aplikasi ini sangat luar biasa. Navigasi yang intuitif dan fitur yang lengkap benar-benar memberikan nilai tambah.",
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAD6AXkDASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAQIAAwQFBgf/xABDEAABBAECAwcBBAYGCgMAAAABAAIDEQQhMQUSQQYTIlFhcYEyFEKRoSMzUnKxwQcVNGKCkiQ1Q1NzorLR4fEWY3T/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAgEQEAAwADAQEAAwEAAAAAAAAAAQIRAyExQRITIlEy/9oADAMBAAIRAxEAPwCaklEe6PUogLCjqmFqBMAggtMLURCCC7T6oAapgEQRfmiL6qAJgggtMLUA1TAIILTC+qgTDoggCbVSk1bIALTC1KRCAI/KNI6Igao6qUpSCaptfNBNSAao6+aiNIBqjr5qKIJr5oqI0iAjZUR8lQNVNUaRpUJqhqrKQpBS7Y6qj7yyXDQqgjVUWx3ortVXGFdSBCpr5p6QIQJr5oUU9KUgro+aFHzVlIEIE101Ta+alaj3TUqOZO5RCPUo0uToIToBMEMQJqQCcIiAWmAU6pgggTeSg2TDoiIBqmAKgGqYBBACmrZQBMAgibyUpHVBEaCgRQRSkQ1zqA3N18LkeO9s8bBe/D4T3eRktPLJlEc+PC7yiA+ojz296QdPl5eFgR97m5EWPGRzDvnU9w/uM+o/AXOT9uODRucIcXMnaCRznuoWu9g4k17hecZGRPkyyTZU8sszyS50ji9xvpZVTeToPxJRrHore3eMXC+FTcnUtymc1egMdfmsuLttwV4HeY2bFrRIEUoHr4SCvNmufpytP+Wx+ITtLyfEKI/aBAP+IfzUlr8w9cxeO8AzeUY/EIOdxru5yYZL9pAB+a2lEUTsdj0Psdl43FGyUhrvC7pdBx9uhW8wOI8Y4YaiyX91pbXDniIB+9E+x+BCn6X+P/HpCK0PD+0MGTyR5bWwS2AHtNwuPzqPm/db4a0RqN7Gy1rnMTCKUiiqyFI0pSNbIApSZRDAooJlCmpip2xWOd1lOpY7h4ldFsfRZFFUxBX1omhSECCnpCk0LSWirKQpIkwlIUrKQpXTCVsjSatvdGk1ccvW6ICNalFc20CYKBNSKg2TBQDRNSIITAIBMNUBCbyQATgbKogBTBQbpgEBAKICjUyKlBFRNSAKUfx0odUaWj7T8cHBMD9C8jiGYHx4dNvug2g+ck6eG/D6n0U0xznbDtJkGafg2BLyY8Y5OISx6Plk3dAHfsjY1ufQLg+cfHkEXuc/mLnOJcS5znEkucTZJvVVkeVn8luIBcSdjSgLvMH3tANJ6fmslmPQ53yBo9Sb/AKzMQREpEXggNINnQLcQB5aGyRjbcmxt72tdGyckCJkjh5ltWfQErdYWDxmSuWEOb15mEk+lgjVcbWiHalZ/wAV8rWUOVjo72c6qPmOYAj8VkMkdQbbyD9LrBIvoStxBwXiUot+O1mwNOd8mit3i9mIeQmVzuZxBaCBQG+pC5Ty1h2jis4V+ZmwvLDEwtBDWuI5SPXTQr0LszLkzcMifM9jzzkNLDYa39m1qOLdk3GGWXHeXvaC+iD06ABcxwjiebwjMaYiQ3mqWJxPJI09CNgV1peLR048nHMT29apRVYuRDl48ORCbjlaHN9L3B9Rsr6W9cMBRMogCNKAI0gFIJlKRFTgsc7rKcFjka/KqLogsilTEskDRRSUpSelKQxXSFKylKRcV0hStpCk1MV1smpNWyalNXHJVqUVK1KalGkCbRAWnpBNE4QA0TAIDQTAFABOAgITC9EAE4QQBMAVOqNHRAQEVEwCCAaIqIqCLyjttmzZXHMqF/eNhwAzFx436AANDnSAf3ib/BesUvLe3+MIeNRzMYA3Kw4JXkXbpGl0ZJ/ALUejkQ42a1/L80Wse8rMxcIz0SaG5ryWyj4eywHN8I6bJN8brxzLV48D3vDWAvddU0WB7nZdLw/g3PTpgLvYLIxMWKPlDGADTQDrfVdBjxUQK328l5+Tkn49nHwx9LicD4e0tcYw4k349R8DZdHjwQxM5WNaOXYALEiY4BvWq1PRbSFgNH03XlmZt69X5iviRt8t/wA1mRxg14a2QhY3/v7rLYGrpWjlexRAyiPf3C8l7TcMHDuKF7WjunSh4AquRx2PqF6+VxnazEjyYJXcrjJq6NwFgFuptd6xEePPbZ9UdkJ3yYmVCQQ2J7Xxm7trrbp+C6elynYiMjBzZDd/aO5Fno1odt8rrF2eOfQoKVsjSNJoARpGgiAiFpSk1KUmipwKx3DX5WY4Kvu9VYlMSIbLJGwVTWgJyaFJq4dSlWHaq1tIoUhSspSlAlIUrKUpQVgbe6blTAbJqQcbuSiEa1KIARUpMAh1TBAwCatkAmCAgJgFAmAQEAJgFAmAQEBGtlAmpBANEaUCICCUipSaggC4b+kKEFnBZuXrlQk+o5HALu1ynbyLm4ThS0f0PEGNJ8myxuB/gFIVw+DQaANiK9Vso6JrqtbhgktPQb/K2LCeYV7FYt69PH42UFeEddFvcYkgae3stDjNJI+F0OMOUNsUVwvD18bYxjwj4WXHIGgiz0VDQO7se6QO/S8t+V15Lk6NtE+69VmM21WvheyMDmc1t0GlxGqtfxHAhvvMrHaRVjns+XRdqRLz3ntn70tDxJoqRjtiCQNPfr+C2+NmYmU1roJo3h11yOBJ+Fj8SgbJC929C3ULNb2usOMua7JCNmPxaFopzM/nP7r4xX8F0lLmuz8kcXEeKwE0chmPLG0NOpaXg7elLp6XSJea0TE9lRRpNSrJQEaRARpAtI0m+FKQLQU5U9I0oK6pVyWLV5CplGhVRS0utZkYWGwarPiCoalKVlKUoE5VKVlKUrEBA3ZNy+iIGo91ZSuJrhq3RrRQ3ZTUdFhpAmHVAJhuUBATpQnCgIThKAVYAgITBAJ62QAUm8lKRrZBAmU1TIAAKTBRFBFyfbLiHDXcOzOFmR/2sSY0wHIRGCw8/KX+dHyXW0uB7WRtfxXLaRYdj4jtR94x1/JNxulf1OOdwwe4jPV26Lpct7zHiRh9GnOHU+mwpX4DoHRNY/Gip/eR+F0g5XHRpaOboRt1vVZRZ9nYeW71JNbn2CRn127xixY/aBoD7Y3UbuBA8uqy8fifH2mQNMMndO5XNaBbq8qSxuyngus3fKWkBzgCNDR0HsmxXsggnlnEjZHODIWvMTqY2MWXPjDTZdZGhoUt/mJ9Z/Ux46Th3GY8qKEnwSlwa5jqvcC1lcUdlY/NNCS1ulODbFu0DdATZNAadVy+Kz/SeG4pI7t0TMl4FBxf+qA7xviO3nX4rts0RGDhIkFOOQ5kJdZ0+zylwvbp+NLy3r+bdPbx2m1NcTkY+ZNMZMvMmE0m0OO6zG3blc8nlvzq9ep3WZwrhHD82RzCciQt1DG5UYk10rkbTldOzGbNM2m8rmvj8QcHCz9WvVXcE4Z3U88xGNLHIZ+6ZI0MbG6VzSZOZh5ydKbrousTGeuU1mJ8bfE4FixRmTAysqDIa55Z3j+ZoeHaNe1wuvPr7roO+myYpoREBlNjLJ2nmMbJC0G2voW03bdtN6LSBRhYxhbGH5L8g3q+ai/6r5S4amthfkthDRn4iRt38LPluNFY/NXdhzmMlo+C8Nx8VmRk2+TIMs0L5pAA6RzTykho0DbsNH81tK8lZE6OB8mM9r6mnkcx51BLjzV8JSNT7n+KlM+OfNvWlRpGkfJbcAARpMAiAqFpFNSakCUjSakaTBWQqZRoVkkKiUaK4jFjHiWxhGiwYx4vlbCEaKpqykaTUjSppKUpPSlImlA1CelANvdNoriOE6lFTqUVxdUCcIBMBugI2TBAJwoCAnCACcICEwQCYIJSbyUARAQEIhQIqiUmCCakEpcN2v8A0XEWvr9dhwV/h5mLulxnbXEdLLwuZhILoJY9drjfzV/zKS6cc5Llcfmaxo+8HF3sQ7mWxdE59UaDgHNN7tO1fw+FrI3kyOBHKSGkjyP0lZsT5AQYzfmx18uvUEag/Cj0x2yWwyMDuV7vkArDysVz9ZHUAdOaqqvwW0ZNLy/2SUmuj4q/zOIP5LV57pTYk5W8xoRxuJu/23kDT0A/FTWpr10nDXuk4nDMwO5GfZoWcznOcWQiuY35nWl6hLht4jw1kJc5j45I54JIwOaKWM8zXAH5Xm/BYXnJjvprpoCSvUOGiQY9iiRsCdXFYnuzUf1p01E3D4JQ5xoTxhrZ2GjTtg6+rT909fcUFxoIYqHK0UbNACz5aLaZ8JfHG6Rpa9tmOSMlkjNbIa5uteY1HotZHDmkisxnL1LsaF7z8ih/yrFsiXWmzDbtmjZEZZbEcfKA1o8Uj3GmxMA1LnbD/wAaZuJFJHD+lrvpZH5E/LqO9lcXED0GgH7qw8PFja5kr5JZpW2GPmIqMOFERRsAY2+pDb9VstmrtHjy8kZLDy2yywxRxAd8/O5mOJrkbH9TvwTOA5ne6uxzbeY7czzZ6a9FW6i5xGxJKta964ctpyILSNbI0jWy6Y4gAiAmARAVxNCgjSNJqVw0tI0iimGkIColGhWSQqJRoUTWJH9XytjDssCMeL5WyhGgVhFtKaKOdyrHfMGnUq4jI0U0WH9qb5hT7UzzVwZumibRYH2tmniTfa2ftLSOR6lFDqmXldxCcJQnFICmCA2TBQME4ShOEDBMEAmCqIAmUARQRFREAIIEygCYAaIAFq+O8Nm4jhBuOAcjHeZoWkgd5beVzATpZG3t6rb0FKCqxOTrx3Ja+PJZ3gc14543tcCHNcKNEHqsvGIL2g+ei7rtZhsyOCZ8rYmGfGdFlh4a0PqM06zV7ErzKPPa18Q8yNele6zMT8einJDqwQGWdtv/AEtNmubz3Y5mnmANdPNTPzXsjY2MmxG3Ub8ztzp5Bc87+sMh7z46Ph6m760pWsz668nL8hveHcV5c2NsbAWAgOAdchO1t6Gl6FFxKRuCyTHysCCYvI5s1kj2tN/TyxuBsheW4HDs5rw9sZ70n9GzmYCfkmluMTA45kS5wnxJGDRzXTuAt2xDST8q2rG6UtbO4ekRZxyoYXZEkFsDie55uQkgAkFyqb3RfUUjC53iEZIHN7fyXGQ8N48I3NDgyqLeaSOtNOp2CeGfI4eeaV7JOV1OfHzOj5nE+EP+lcbUiXetpj49BxJQR5EEteDoWlu4KzXSN5TqPpsD+a5F/FOTDhyweX7RDGSDoXOB5bIHWqWdj5jzjl0mnMx0kdmjRaTVem4Wqbjjy9zraYT3yYzHGxzPl0vTR5CyqVGE2sTFGusLHG/Nw5iskBemIfOtbsKR8kaRpaZABMAoE1KoWk1KJkApRFRApCol2WQVRLsgxY/q+VsItgsBn1fK2MWwVgCY0D6LnuIZckZIaNbW/nrlK57MZzyV6rcMtd9uyT0KH2zK6D81kjHHoj9nHkEwYv2vL8uqP2vL8lkjHGmybuB5BXBi1RKYBDqUQvE9JqTAIBMEDAJgEAEwCBgE4CUBOAiGATAIAJwqIj5IgIgJiJSYBSkwCuAAJqUGyZXBKRAURAVwJJDHPHNBJ+rnikhfp92RpYf4rwjLxJMLKnxJQe/xMmSBwPXu3EA/O697oLzzt9wYROi49DXLI6LEzW7fpeUiOX5rlPsPNIIlzEXLktYKJILA43pQOquyMSJ7u8b+jeTo6M8u2lEDRa/DmAPiPw3101W4gc13hcbadb9FienrpkwbAgkLw2SSVoA3LWuaQd70W6EOVzsbFkSODg3l8LTyttYMTjiNfL3g5WBzgHefQeaxsPi/GMieKLvC1vet5u7AB31G2yz69NeSK9Y7/F4YyRoM1lho0TRPok4tg478R8QY1sZIDWtAAHoAnxchjY/E/wAQ1JJtLn5DHxBwcHU7UC+vsb/Jc5nWrW72WDmxM+yxQkDkdG2Nrf2eWvpKmEx0jsfhoJfziNsb7/2PMHvLvZocFXlZ0LsCR5LAIn8xsghpaOnX3W67MYLyz+ssmPklywBisO8WM4aH3f8AUdOq3WM9ea9t8bprQAABQAoDyGwCYUtTwHi0fFo8iOwcnGkkifRFkxuLSCPhbcBemO/HzrRkpoipQUW8RAEyA6oq4g6I16oJkApGlFEClUyjQrIKol2KkwrEYPF8rYRfSsBg8Xys+PQJEIqyDoVo5dZHHyW4yXaOWndq5x9VuEKKU0UUVQQNk1D1UHRPQQanzTgbIdSmC8L1CE4CATBAQnGqUAKwBEEJwEoThVDBMBsoAmFq4aITDogAU1FXESkwUCbZXAANE1KapgCrgA9kaRpEWriaAC0fax2GOB5kGQReS6JmOyrL3seHn4Atb6l5925yJHmWSMkswHQsoXXK1w7w18/kk+LWe+3AZOPLivNEmJ1ljh5fsuPmo3Mla+MtcQAKOpIv1W8c1r2kEBzSNLFj3Wrn4W4ePHPNZssduPZZiYnqXaazHcM6CR+WLkc4gFpomrHsFtYGY8L4gBq4EEsPV3UUuexZ5cV36Zj2aWDVXXQrPbxHFBa/Vp15QAfm7WZrOulbw6t00YiFmg/l0N0B5mtVXk8RjYHnmDeaMx8pqrbVOPNotOzMzM3uocHFlnIHKQzRoLv7+wrqSV0nCeyj3vZk8Xc2YskD44GOcYroAd4TV+1UsxlfWrWm3hez3CJM97cvNBdw5p7yGKQf2h9gguafuD813rZGx8jtg3lcb00bqsQFsQa1oaAABQAAAGmw0Ws41xIY2FkODvEGOr8OizMyRXrtx/YJ83/zHtEGOIxwc18jfu87sumUfxXqkzAx5oaO8QXmP9HDGvzeOZdEvnzMeIuPUMY6R3pudV6tKzna09QdPW+i9dXhuw1FaYndKSljx90rbBR1RQCKAo6oIhEFRRFFAjZUS7K8qmXYqDEZ9XysxpoLDb9XysoHT4VhNYuUfCVrf/KzMt2hHwsPoFpAUCKCAjcKxVjcJ7QaytSmAQrUpgvC9RgEwCATAK4hgE4CACcBXEEBOAlCcBXAwCYBABMAtYggJvJQBN5K4mpSatlKRrZVNSkw0QpMAhqI0jQUA6dTsqmiNNegtx+NVxMuIOItyWSt5m5HetfQs1Jdn810/EeJY2DHIwua7IexzGRg3XMOUueQtbwhjX87DuAN/RSVj15xiiWJ02HOKnw5ZMaUHzjJaD8hZTo9LG6zu1eD9h44/IaCG5ZaXj1LA5p/iPhVRBsrBW5XO1cerjvExjEY2zTmtcNPqAOo91t8PEwncpfBCSTXiYw7/CwuTlfThS2EDXAt5aNVS523HWmb26vh2NExvgjjDABQa0NF/wCFbawANlruGyt7hoIpwV00tA0dFzr06XjZLkThnMb6arg+1HEudhha7Q70t9xTMEcb6OtHqvPeIyumdI9xver8l2pXZcb2yMd3/RxE5uEH0f0mVNLoPMAAlelF7XRF7HNeA4UWEOFgjYjReSTcYwuzvZV/CA939d53DhEIGMPLhxZbbdJPJ9Ie5pJAskWNtztf6NPt32V5kc/uHNc/ldYYIrqJ1H7ztSPReuK48E22XozzyGz5ElBlupxFDYD+aVoMryfuA6ep81fo0BAjgy2ihrvaqcxl6dT0OyEknj8NkoUGW55tx/AIiGJ2ta1uhRG4I91IXlxcTfKToFYXHmaHVdG7VQiijnxtrmFW4MFeZTlu9H4KgQhUyDdXuBG+iok6orEb9R91be6p6n3U5tCrDLEynW4BUJ5zzSeyRURRRSkEHT3T0lA2TINb1KceyHUpwvJj0CFYEoTBIQwThVlwaLKoflMb1C0M0Jwta3OjJouWXFkNdWoVRlBOOiRpB2VgVQQmQG6YBVBCIUTBMRBdIjopR0WDl8RixyY4i183XqxnvXVXBlzTwY7O8meGt6dXOPk0Lns3jGTKXRwXDFtTT43Dzc5Y+TkTTPL3uc55FW/oPJo2CwyDagw8lzi17iTzB3Ob3NG1nydoMfs7Pwts2OZBmx4+RkzSEiPGgyATH3TW6uI05yaroOqpfD3oI/ArGzoIc/GgxM0lk+Oww487m88ckNlzY5KFgt+6R7FWufSW/wC1eNDxTCgyMdrnSSYUs8Ra0lrnYjhMOUjrRcCuKwZPC0jYgEeyox8fjeE8f1fxSeNsgqF0cwyMSQscPCOe2aHQih5LNiysHv3w8Vji4TnHkeySNpHD8kaAvDRZYSddDy+y3esWjpqlvzPbPfCJGhwqwsrFi+n4Rghlaxr/ANHJjOPKyfHkjlgeddGvYSs2OIsIIFjReO2x1L30ye4Z0LiwDXSkmTkhrHW7oq3TtY3pfqtLnZTiHNBWIrjUy1/E8kykgLF4XgQ5OUJ8kA4+M4PbG4eGfIGrIz6DRzvjoSiY5p3hkTC+R72xhrQXeN5pt0u9wuzMOHj4p4k8GKIXBgs153upznzv3JJ3AroLK9fFEbsvJzWzqHEN7PZvGsmfik8R+wmeRzC9vizpWkgRwt6sFAvdtpQvp6X2dxXQ4jYWRsGO5mPO7Ia4OfkTyMuRpaNgzRo9lczEmy3NdKDDjRtDGRM8LiwCuWhs30H8tdvFHHExkcbWtY0U0NFAAei72trywsADWitNNFRISfZWvNKiR1BYUWADVUTO5nUNzp8K4Gm2qWNL5LOw1VDy/o4463BBTtcJGteNxdoZAtoWLBIWktOxRDsBnyAD9MZ5j7rPqrVGMynzO86Vx3UUS0O0IsV+CxponNaXbt8+vystQgFrgdQRR9iorRuNWqC/dX5rDC9zdx9TT5tOy13eakLcMi7VzilR9VEQqKlKUiiOiZKOiZBgVqU4CQblWBefHYwCbaygEJDTSmIwszJEbXG6q1x/EeNtic4c/XT1Wz43liNklmtD1Xm2TO/ImfI42CTyhWIV1WPxt0jhTidV03Ds57+WzuuA4ZGeZppdrgx0wOGlBcptku9OPYdhjTcwGu6z20aWiwZQQ0LdxG2rrXt571ycWgJggEw/8/8AtbxgaVcs8GOLldROzR9R9lg5PEgCYsTxyXymX7g8+XzWula9jmPkc58khtxd5eSC7M4nkSXHF+jaTVNJs/vOWM3HIYHEeI6uJWRDjCSQyEeEDwj1WZ3ehFBMGpDQTyuCLsdp2HmsjJh5XAjrqU0bbBTBrxE4OAA60sh+CyZnJI3fqNx7LYRxtsGgriwEBMVz7OF/Zou6ETXsdNPLIWtADzJy+Igfe01PVM7EjfGI3MjlYLqLJY2QCxRrnBXQBpRMGO/6mC/MaFIjDXnv9Tv4VnPy+GkMZLceRg5LnNilicQ4sjn1qiLZY0IGtaHpcTN4XnM5MTMjdkx+CfCzHMx8+J7Tq0xvIa73aTfzpvTg48jS13LIw7tkAP5rge23ZZ/LFxPhuLM8QsLc0M/SOEbfplDR4vDsfSvJJpF/Wq8k08bbOk7hz45GuZJr4Xgtd+B1WHgcMzOLkzNBiwmOIfkEfrCN2wjqfM7BaPszg8UmbBkcWz3Y/Zx5e2Nme5zhnln1Mw2ODnho+85oA6WSV7BjwY2Ri4z8eWF2K+FpxzjAd0I605BtXpSxHFn11nn2OoU8AxMPCxZxDjsBbNTDyjvHODASS869dfdbIQh0hlkp0h69AOgaPJGKOKCNkcYprb31JJNkk+ZTB66RGPPpi4NoBMDoCqCbcnJ0pVCvfZpKRzAWl3IVgVEFAV6J42gWaVRNmgrm7fCBJdQsBwIf+Kz3rFlbVIjMxj4T60rd3V5KnG+lXgeIlSVgCfFVJwkP1BMTQcfRFYHFYS/H70DxQmzX7B3XNgkuK7Og4EOALXAhwOxBFEFcpkY5xsmWI7NdbD5sOoKsJJa0RpRRaQD0UCh6KBETy90yXyTIMHqU4SdSnC4Y6HVOS4tjPsVaXAa2Fr87IY2N2o2KYuuF7T5BDXtB3PKuRYLIW77QTiSblB+8StNH9QV8hY7l0nCor5PhdbC0MjoeS5bhMjWlt10XUskaWjUUV5bevoUjpsMEmwPVdHj3yhc5hObzN1C6SCuQUR0Xpp48PL/0vb/7taLiPEzMXY+OSIRpI8aGQ3sPRbLiE5x8SRzTT5C2Fn+Lcj4XNxs5pAOhP81Zcmzw4wQCB0V+VFbQa2VPDpOWeaA7aOb/ANlscgAtFDdWAmCwlmu9LIc0NKsxIeRlnfdJK4c5CoxJm2Sqo21ayJLsJAKv1RE2TNNpHA0PZWRhUXNTk0R7KRs0KcgDyRQFnYLB4rJLFiTkP5XFrm2N6cOU18ErZgtAtaviscs+POGjQMe4+tC0SWVxnhnZX+q+GR8UEONgYLIo8R4e6J0Xga0RxiOyb0sUdvRbLhkfCo8HEbwt0bsLlPdOiILXWSSTQGt76fwWq4zwaPtJwnhH+kvgnhZDkQytHOwl8bQ5r2Cj03B0/JbDgvCIuD4ceKyQv8XO828MLiNeRjia9dbO59L8GeQBzH4SbAKxw3AVTraoIwm9Uzjukj1pPJsqKlYDqCk6WpaCxoslW7D4VTOqsOyCs2q3jmGquItVkG6QXQCgFcOqrYKAVnT3UlSH62pn/SfcIbvd6DRSSzyNHV35BA33h7LWcXg5mR5DR4o/A/8AcJ0Pwf4rZHQj0QljbLHJG6qkaWG/Ubpo5VRM9jo3vY7RzHFp9waKRbZRRRQIgdR7pkvUe6dBgXqUJJAxpKl6la7iE/dsdr0K5tqsriTY7HN+a5ziXGmBrhzj01Wi4vxSXvjEw6jVxs/gtFLLJISXuJv10QX5M5yJnPN1ZpK0VRVTNSAtniYpmewVoSsy1VmYBlAaQDS3Ds2SNou6C2GFwpvdN0F15LXcWxnQxv06LE8eu0cudL8LjLWvAL+u1rteH8SjlYynX8rxF00rZCQ4gg9Cul7O8XyGTFkriWNHMDf5LpEY42tsvReL5JlmxoWHSLU1t3j9fyCqibyv13H89Vh2978cv+t9yPPkXarYFtCOTp9PvWloypjeWZ0Z83UfldLG0PDbXKPJ+0xEf7xq6rFkD2trcUkDNFBh9lrn/WbPmsx7qasOaw5v97f0VBNVaru69012B6IBuo91UR40KaEaWUzY3PJvZXMYAK8kEFgaI8hdv7q0NFfgjoEVBG0CylmY18EgrcEfBCJfYIVsbeZhaiE4I7m4TgNO8TZID7xSOZ/JbAOpazgh5YeIwf7jiWS2vSQMmH8StkUDWCUsjbbapLy13ushpDmhBXEPyUk2VjRVpH2fxVFXQjyKCJHiHrojWqBmK27CrYNE9qCDRQNt1o7hMwIH0r4UB09lCg3UkKKIGrj50lu5R6Ch/FNdb+qrj1cXdLNeyoscdSjeirc7UqzoFBo+Kw8k7ZR9Mzdf326H8lryuh4hF32LJQt0dSt+Nx+C55bhmQUCNKUqheo906Fbe6akGqe8NB1XM8azGsZJroGkldBkfQ5cN2i/VS+xXNtyE0hkkkeTq5xKrU6fAQVRfA3md8rquFY5DmOI6rmcH9a33C7nhlcrfZFh0mKWtjb+a57tHPEIZSCBytN35ret/Vn5XF9pie7m9x/FalHIF1knzNrcdn297nRQ9Ced37jNT/JaULoeyn+sZ/8A8j/+tqyQ9Dx6kyqP3Y6F7HSlsTZa9h05GgD3C1uN+sm/wf8AUttL9Q/w/wAFmFlqGm8mEeUoW+wp6lkjvrp7LRM/tcX/ABVtMb+2BUb5zrA/NYkrrLq6EALLP8liHp++5VBY1xr2V0bG8wvfVPHt8K1lczfcoA0AH3CBNF3uVd978VVJ973QDnUGtqM3+FYgqGj3C9LBHys+AU0rEG/4LYw/SfZBquFOrP7Qx/8A24U/+eNzD/ALbkaLUcM/1zx7/gYH8ZFvTXKVRrJjRCtgk6KZFWPlLDuFBl3olI0CcbD2TfdCDFfpR9kQAaoq2T/soyuUKhWilOquFIdQoECsCIpOEClVtPj+VeqvvqKWQn6B16+Q6lM0BrdPJD/ayfuxfxKt6KjHOpKtH0pXbqxuwRCitQdjYPsdFzWTEYZpoj9155f3TqF1Hn7rScWA+0s9YWX+LlYSWtU1ThELSEA23Tcp9U3kmVH/2Q==" 
    }
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
        handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-screen lg:h-[70vh] items-center justify-center py-10 bg-[#F1F5F9]">
            <div className="container mx-auto lg:px-28 lg:py-10">
                    <div className="relative w-full lg:px-16 lg:pt-10">
                        {/* Ulasan konten */}
                        <div className="flex gap-5 lg:gap-0 items-center flex-col lg:flex-row">
                            <div className="w-[80%] lg:w-1/2">
                                <img
                                src={reviews[currentIndex].image}
                                alt={reviews[currentIndex].name}
                                className="rounded-xl object-cover lg:w-[80%] h-[80%]"
                                />
                            </div>
                            <div className="w-[80%] lg:w-1/2">
                                <h3 className="text-lg font-bold text-non-active">ULASAN PENGGUNA</h3>
                                <p className="text-xl text-dark mt-2 italic text-justify"><span className="text-yellow-500">"      </span>{reviews[currentIndex].text}<span className="text-yellow-500">      "</span></p>
                                <div className="flex flex-col gap-0 justify-center mt-5">
                                    <p className="text-md font-medium text-gray-800">
                                    {reviews[currentIndex].name}
                                    </p>
                                    <p className="text-lg font-bold text-gray-800">
                                    {reviews[currentIndex].role}
                                    </p>
                                </div>
                                <div className="flex justify-start items-center mt-8 gap-2 ">
                                    {reviews.map((_, index) => (
                                        <span
                                        key={index}
                                        className={` h-2 rounded-full transition-all duration-300 ${
                                            index === currentIndex ? "bg-blue-500 w-10" : "bg-gray-300 w-2"
                                        }`}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigasi */}
                        <div className="absolute top-1/2 transform -translate-y-1/2 -left-5 lg:-left-2">
                            <button
                                onClick={handlePrev}
                                className="p-2"
                                >
                                <img src="assets/images/next.svg" alt="" />
                            </button>
                            </div>
                            <div className="absolute top-1/2 transform -translate-y-1/2 -right-5 lg:-right-2">
                            <button
                                onClick={handleNext}
                                className="p-2"
                            >
                                <img src="assets/images/next.svg" alt="" className="transform -scale-x-100"/>
                            </button>
                        </div>

                        {/* Indicator */}
                        
                    </div>
                </div>
        </div>
    );
};

export default Carousel;
